# Etapa de build
FROM golang:1.25.5 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o api

# Etapa final (imagem leve)
FROM gcr.io/distroless/base-debian12

WORKDIR /app
COPY --from=builder /app/api .

EXPOSE 8080

CMD ["/app/api"]
