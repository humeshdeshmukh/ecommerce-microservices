# infra/terraform/variables.tf
variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project" {
  description = "Project name prefix"
  type        = string
  default     = "ecommerce-ms"
}

variable "cluster_name" {
  description = "EKS Cluster name"
  type        = string
  default     = "ecommerce-eks"
}

variable "node_group_desired" {
  description = "Desired node group count"
  type        = number
  default     = 2
}

variable "node_instance_type" {
  description = "EC2 instance type for worker nodes"
  type        = string
  default     = "t3.medium"
}

# Docker images will be pushed to ECR repo names below
variable "services" {
  type    = list(string)
  default = ["auth-service", "product-service", "order-service", "cart-service", "payment-service", "notification-service", "api-gateway"]
}
