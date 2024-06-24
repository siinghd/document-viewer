FROM python:3.12

ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN useradd -m myuser
USER myuser

EXPOSE 5001

HEALTHCHECK --interval=10s --timeout=3s --start-period=30s --retries=3 CMD curl -f http://localhost:5001/health || exit 1

CMD ["sh", "scripts/start.sh"]