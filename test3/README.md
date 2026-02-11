# Petstore API Automation Framework

A Go test framework for thee [Swagger Petstore API](https://petstore.swagger.io/). It shows how to organize API tests with clear structure, typed models, and parallel test execution.


## Features

- **Organized Structure**: Separate packages for `api` client, `models`, `tests`, and `utils`.
- **Typed Models**: Requests and responses use Go structs for clarity.
- **Retries & Context**: Supports retries and `context.Context` for better control of requests.
- **Parallel Tests**: Uses `t.Parallel()` to run tests faster.
- **Independent Tests**: Each test generates its own data and does not rely on other tests.
- **Error Handling**: Checks HTTP status codes and wraps errors for clarity.

## Tech Stack

- **Language**: Go 1.25+
- **HTTP Client**: Standard `net/http` with custom wrappers for ease of use.
- **Assertions**: [stretchr/testify](https://github.com/stretchr/testify) for assertions.
- **Serialization**: Standard `encoding/json`.

## Project Structure

```bash
test3/
├── api/            # API Client implementation with methods for each endpoint
├── models/         # Go structs representing API resources (Pet, etc.)
├── tests/          # Test suites (Positive, Negative)
├── utils/          # Helper functions (Config, Random Data Generators)
├── reports/        # Directory for test reports
├── go.mod          # Go module definitions
└── README.md       # Project documentation
```

## Setup & Configuration

### Prerequisites
- [Go 1.25+](https://golang.org/dl/) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd test3
   ```

2. Install dependencies:
   ```bash
   go mod tidy
   ```

## Running Tests

### Run All Tests
Run all tests in the project with detailed output:
```bash
go test -v ./...
```

### Run a Single Test Case
Run a specific test function (e.g., `TestCreatePet`):
```bash
go test -v ./tests -run TestCreatePet
```

## Test Scenarios Covered

### Happy Path (CRUD)
- **Create Pet**: Verifies a new pet is created with correct data.
- **Get Pet**: Retrieves a pet by ID and validates fields.
- **Update Pet**: Modifies existing pet data and confirms persistence.
- **Delete Pet**: Removes a pet and verifies it can no longer be retrieved.

### Negative & Edge Cases
- **Get Non-existent Pet**: Verifies 404 Not Found for unknown IDs.
- **Delete Non-existent Pet**: Verifies proper error handling when deleting missing resources.
- **Invalid IDs**: Tests API response when handling invalid inputs (e.g. negative IDs).
