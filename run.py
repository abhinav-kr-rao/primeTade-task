import argparse
import logging
import time
import sys

def main():
    # Start a timer at the very beginning to track total latency
    start_time = time.perf_counter()

    # Set up argument parser
    parser = argparse.ArgumentParser(description="Primetrade MLOps Task Runner")
    parser.add_argument("--input", type=str, required=True, help="Path to the input data file")
    parser.add_argument("--config", type=str, required=True, help="Path to the configuration file (YAML)")
    parser.add_argument("--output", type=str, required=True, help="Path to the output file")
    parser.add_argument("--log-file", type=str, required=True, help="Path to the log file")
    
    args = parser.parse_args()

    # Set up logging to the specified log file
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        handlers=[
            logging.FileHandler(args.log_file),
            logging.StreamHandler(sys.stdout)  # Also log to stdout for visibility
        ]
    )

    # Log "Job started"
    logging.info("Job started")

    # Placeholder for the rest of the script logic
    # Total latency can be calculated later using (time.perf_counter() - start_time) * 1000

if __name__ == "__main__":
    main()
