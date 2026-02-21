import argparse
import logging
import time
import sys
import os
import pandas as pd
import numpy as np
import yaml


def main():
    # Start a timer at the very beginning to track total latency
    start_time = time.perf_counter()

    # Set up argument parser
    parser = argparse.ArgumentParser(description="Primetrade MLOps Task Runner")
    parser.add_argument(
        "--input", type=str, required=True, help="Path to the input data file"
    )
    parser.add_argument(
        "--config",
        type=str,
        required=True,
        help="Path to the configuration file (YAML)",
    )
    parser.add_argument(
        "--output", type=str, required=True, help="Path to the output file"
    )
    parser.add_argument(
        "--log-file", type=str, required=True, help="Path to the log file"
    )

    args = parser.parse_args()

    # Set up logging to the specified log file
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        handlers=[
            logging.FileHandler(args.log_file),
            logging.StreamHandler(sys.stdout),
        ],
    )

    try:
        # 1. Load Config
        if not os.path.exists(args.config):
            raise FileNotFoundError(f"Config file not found: {args.config}")

        with open(args.config, "r") as f:
            config = yaml.safe_load(f)

        seed = config.get("seed")
        window = config.get("window")
        version = config.get("version")

        if seed is None or window is None:
            raise ValueError("Config file must contain 'seed' and 'window' fields")

        np.random.seed(seed)
        logging.info(f"Loaded config: version={version}, seed={seed}, window={window}")

        # 2. Load Data
        if not os.path.exists(args.input):
            raise FileNotFoundError(f"Input file not found: {args.input}")

        df = pd.read_csv(args.input)
        if df.empty:
            raise ValueError("Input CSV is empty")

        if "close" not in df.columns:
            raise ValueError("Input CSV must contain a 'close' column")

        logging.info(f"Loaded data: {len(df)} rows found in {args.input}")

        # 3. Rolling Mean
        df["rolling_mean"] = df["close"].rolling(window=window).mean()
        # Drop rows with NaN values resulting from rolling window
        df = df.dropna(subset=["rolling_mean"]).copy()
        logging.info(
            f"Calculated rolling mean (window={window}) and dropped NaN rows. Remaining rows: {len(df)}"
        )

        # 4. Signal Generation
        # Assign 1 if close > rolling_mean, else 0
        df["Signal"] = (df["close"] > df["rolling_mean"]).astype(int)
        logging.info("Generated trading signals based on close price vs rolling mean")

        # Save output
        df.to_csv(args.output, index=False)
        logging.info(f"Job completed successfully. Output saved to {args.output}")

    except Exception as e:
        logging.error(f"An error occurred during execution: {e}")
        sys.exit(1)
    finally:
        total_latency_ms = (time.perf_counter() - start_time) * 1000
        logging.info(f"Job finished. Total latency: {total_latency_ms:.2f} ms")


if __name__ == "__main__":
    main()
