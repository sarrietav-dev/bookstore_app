FROM python:3.11.4-alpine3.18

RUN pip install "poetry==1.4.1"

WORKDIR /app

COPY pyproject.toml poetry.lock ./

RUN poetry config virtualenvs.create false \
    && poetry install --no-dev --no-interaction --no-ansi

COPY . .

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]