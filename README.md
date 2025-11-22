## Architecture Overview

The system consists of three independent **NestJS** services, each designed to be isolated and scalable.

### The Services

* **API Gateway:** Acts as the single entry point. It validates user access tokens (JWT) and securely forwards traffic to internal services using HMAC signatures.
* **Auth Service:** Handles everything related to identity—user registration, login, and token issuance. It maintains its own dedicated database.
* **Machine Service:** Manages the lifecycle of virtual machines (creating, running, failed). It includes a background worker to simulate asynchronous provisioning and supports idempotency to prevent duplicate operations.

### key Design Decisions

**Why REST?**
chose REST to keep the architecture simple and accessible.  making testing easy (via curl or Postman), and avoids the unnecessary complexity of gRPC for this specific scope.

**Why PostgreSQL?**
use PostgreSQL across all services for consistency and reliability. It creates a stable environment for managing transactional data and is effortless to spin up locally using Docker.