FROM python:3.11-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      git \
      libgdal-dev \
      libgeos-dev \
      libproj-dev \
      curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Install climatemaps package
COPY climatemaps ./climatemaps
COPY setup.py .
COPY README.md .
RUN pip install --no-cache-dir .

# Copy the rest of your FastAPI app
COPY api/ ./api/

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:${PORT:-8000}/health || exit 1

CMD ["sh", "-c", "uvicorn api.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
