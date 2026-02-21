# MLOps Signal Pipeline

A Python-based data processing pipeline for financial time-series data. This tool calculates rolling means, generates trading signals, and provides structured results in JSON format with comprehensive error handling and containerization support.

## Features

- **Data Processing**: Loads CSV data and calculates a rolling mean for closing prices.
- **Signal Generation**: Automatically generates trading signals (1/0) based on price crossovers.
- **Metrics & Logging**: Tracks processing latency, signal rates, and row counts.
- **Robustness**: Comprehensive `try...except` blocks with JSON error outputs for failing jobs.
- **Containerized**: Ready-to-use Docker environment for consistent execution.

## Project Structure

- `run.py`: The main execution script.
- `config.yaml`: Configuration file (seed, window size, version).
- `data.csv`: Input financial data.
- `requirements.txt`: Python dependencies.
- `Dockerfile`: Containerization setup.

## Getting Started

### Prerequisites

- Python 3.9+
- [uv](https://github.com/astral-sh/uv) (recommended) or `pip`
- Docker (optional)

### Local Setup

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   # or using uv
   uv sync
   ```

2. **Run the Script**:
   ```bash
   python run.py --input data.csv --config config.yaml --output out.json --log-file run.log
   ```

## Usage Args

| Argument | Description |
| :--- | :--- |
| `--input` | Path to the input CSV file (must contain a `close` column). |
| `--config` | Path to the YAML configuration file. |
| `--output` | Path where the results JSON will be saved. |
| `--log-file` | Path where execution logs will be written. |

## Docker Support

Build and run the application in an isolated environment:

1. **Build**:
   ```bash
   docker build -t primetrade-app .
   ```

2. **Run**:
   ```bash
   docker run primetrade-app
   ```
*Note: Default command runs the script using `data.csv` and `config.yaml` included in the image.*

## Output Formats

### Success JSON
```json
{
    "version": "v1",
    "rows_processed": 100,
    "metric": "signal_rate",
    "value": 0.45,
    "latency_ms": 15,
    "seed": 42,
    "status": "success"
}
```

### Error JSON
```json
{
    "version": "v1",
    "status": "error",
    "error_message": "Input file not found: data.csv"
}
```
