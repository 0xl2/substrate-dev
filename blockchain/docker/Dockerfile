FROM rust:latest

RUN apt-get update \
  && apt-get install -y git clang curl libssl-dev llvm libudev-dev binaryen
RUN rustup default stable \
  && rustup update \
  && rustup update nightly \
  && rustup target add wasm32-unknown-unknown --toolchain nightly \
  && rustup component add rls \
  && rustup component add rust-src --toolchain nightly-x86_64-unknown-linux-gnu
RUN cargo install --force cargo-contract

EXPOSE 9930-9960 30330-30350

WORKDIR /work