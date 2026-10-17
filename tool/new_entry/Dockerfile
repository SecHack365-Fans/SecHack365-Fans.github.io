FROM rust:1.99.1-bookworm AS builder
WORKDIR /app

COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
COPY --from=builder /app/target/release/new_entry /usr/local/bin/new_entry

ENTRYPOINT ["new_entry"]
