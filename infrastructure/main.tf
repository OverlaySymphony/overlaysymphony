terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  backend "s3" {
    bucket       = "lichensolutions-terraform-state"
    key          = "projects/overlaysymphony/terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true
    encrypt      = true
  }
}

provider "aws" {
  region = "us-east-1"

  default_tags {
    tags = {
      Project   = "overlaysymphony"
      ManagedBy = "Terraform"
    }
  }
}

module "webapp" {
  source = "./shared/shared/webapp"

  domain = "overlaysymphony.com"

  google = {
    verification = "f78JvIteeIcoTXpwBVApcgrldh2zSoHDQKMrshqTnVI"
    dkim         = "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCKyBSNf/DUTXgk9oohu4uAyzGVKk3cq5EYBLcOqGNuPR5dyXQuoaGDeX8AjDZIRSpcXkTMyP42UJwZ4seCEdjqMKMuICQLdZpptXC+d38IyGzJtMMNb2rO8/D/nnzsxPBieZqAPPhF/VDhZFKtlQxRMgqAOze4vmIhKLarJb2wZQIDAQAB"
    mx           = true
  }

  github = {
    organizations = {
      "overlaysymphony" = {
        challenge  = "94642f2f97cfec953d0e3009e26140"
      }
    }
  }

  static = {
    subdomains = ["www", "cdn", "editor", "studio"]
  }
}

output "webapp" {
  value = module.webapp
}
