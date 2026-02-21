# Use a standard Python slim base image
FROM python:3.9-slim

# Set the working directory to /app
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy run.py, config.yaml, and data.csv into the container
COPY run.py .
COPY config.yaml .
COPY data.csv .

# Set the default command to execute the script automatically upon startup
CMD ["python", "run.py", "--input", "data.csv", "--config", "config.yaml", "--output", "metrics.json", "--log-file", "run.log"]
