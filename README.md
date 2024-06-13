# wasserstoff-BackendTask

https://wasserstoff-backendtask-n72d.onrender.com/

**Dynamic Load Balancer**

**Postman Link**

https://shubhi-gupta-0846.postman.co/workspace/Shubhi-Gupta~ea437a1c-31bf-4714-8e47-e77cdda13682/collection/34254465-78ae28cf-3842-4082-bead-2ef7bbcff352?action=share&creator=34254465

**Description:**
This project implements a dynamic load balancer using Express.js in Node.js. It includes components for routing incoming requests to different API endpoints based on their type, payload size, and speed, along with queue management strategies for efficient request handling.

**Features:**

- Dynamic routing based on API type, payload size, and speed.
- Queue management with various strategies (e.g., FIFO, priority-based, round-robin).
- Middleware for logging request and response payloads.
- Load balancer component for distributing incoming requests to the queue manager.
- Detailed logging and metrics for analysis and optimization.

**Setup:**

1. Clone the repository.
2. Install dependencies.
3. Configure environment variables in the `.env` file.
4. Run the application.

**Usage:**

- Send requests to the load balancer endpoint with payload specifying the type and speed.
- Monitor logs and metrics for analysis and optimization.

**Technologies:**

- Node.js
- Express.js
- Pino
- JavaScript

**Deployment on Render:**

- Successfully Deployed on Render with deployment url
  https://wasserstoff-backendtask-n72d.onrender.com/
