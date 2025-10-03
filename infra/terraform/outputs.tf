output "ecr_repositories" {
  description = "ECR repo URLs"
  value = { for k, v in aws_ecr_repository.repos : k => v.repository_url }
}
