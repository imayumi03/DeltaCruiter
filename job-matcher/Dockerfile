# Dockerfile
FROM python:3.9-slim

# Set working directory inside the container
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code into the container
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Start the FastAPI application using Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
