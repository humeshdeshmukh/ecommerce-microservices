# infra/terraform/main.tf
terraform {
  required_version = ">= 1.3.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.18"
    }
  }
}

provider "aws" {
  region = var.region
}

# Create ECR repos for each service
resource "aws_ecr_repository" "repos" {
  for_each = toset(var.services)
  name     = "${var.project}/${each.key}"
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration {
    scan_on_push = true
  }
  tags = {
    project = var.project
    service = each.key
  }
}

# Basic EKS cluster using aws_eks_cluster + aws_eks_node_group
# NOTE: For production prefer the official eks module (terraform-aws-eks).
resource "aws_iam_role" "eks_cluster_role" {
  name = "${var.cluster_name}-cluster-role"
  assume_role_policy = data.aws_iam_policy_document.eks_assume_role.json
}

data "aws_iam_policy_document" "eks_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["eks.amazonaws.com"]
    }
  }
}

# Create IAM role policies, VPC, subnets would be needed here.
# For brevity this example is *incomplete* for a production EKS cluster.
# Consider using the terraform-aws-eks module: https://registry.terraform.io/modules/terraform-aws-modules/eks/aws/latest

# --- Minimal VPC (example) ---
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "4.0.0"
  name = "${var.project}-vpc"
  cidr = "10.0.0.0/16"
  azs  = ["${var.region}a", "${var.region}b"]
  public_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets = ["10.0.11.0/24", "10.0.12.0/24"]
  enable_nat_gateway = false
}

resource "aws_eks_cluster" "cluster" {
  name     = var.cluster_name
  role_arn = aws_iam_role.eks_cluster_role.arn

  vpc_config {
    subnet_ids = concat(module.vpc.public_subnets, module.vpc.private_subnets)
  }

  # For simplicity: do not enable many addons. Expand as required.
}

resource "aws_eks_node_group" "node_group" {
  cluster_name    = aws_eks_cluster.cluster.name
  node_group_name = "${var.cluster_name}-ng"
  node_role_arn   = aws_iam_role.eks_node_role.arn
  subnet_ids      = module.vpc.private_subnets
  scaling_config {
    desired_size = var.node_group_desired
    max_size     = var.node_group_desired + 1
    min_size     = 1
  }
  instance_types = [var.node_instance_type]
}

# NOTE: The above EKS resources require additional IAM roles & policies (aws_iam_role.eks_node_role), omitted here for brevity.
# For a fully working EKS setup, use the terraform-aws-eks module and follow the module's inputs.

# Kubernetes provider to operate on the cluster (after cluster created)
provider "kubernetes" {
  host = aws_eks_cluster.cluster.endpoint
  cluster_ca_certificate = base64decode(aws_eks_cluster.cluster.certificate_authority[0].data)
  token = data.aws_eks_cluster_auth.cluster.token
}

data "aws_eks_cluster_auth" "cluster" {
  name = aws_eks_cluster.cluster.name
}
