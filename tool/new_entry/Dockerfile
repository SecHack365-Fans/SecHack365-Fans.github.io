FROM rust:1.50.0
WORKDIR /app

COPY . .
RUN cargo build --release

ENTRYPOINT ["/app/target/release/new_entry"]
