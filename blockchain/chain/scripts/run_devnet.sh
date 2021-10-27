#!/usr/bin/env bash

tmux kill-server
rm -rf ~/data

HERE="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )/../target/release"

alice_cmd="$HERE/catena \
  --alice \
  --chain develop \
  --ws-port 9944 \
  --rpc-cors all \
  --base-path ~/data/alice"
tmux new -d "$alice_cmd"

bob_cmd="$HERE/catena \
  --bob \
  --chain develop \
  --ws-port 9945 \
  --rpc-cors all \
  --base-path ~/data/bob"
tmux new -d "$bob_cmd"
  
node01_cmd="$HERE/catena \
  --name Node01 \
  --chain develop \
  --ws-port 9955 \
  --node-key bf4f27435f5d69ffc79738c2e3ad1c22f4d894d4e7e52eacb98e1aab40cb30af \
  --offchain-worker always \
  --rpc-cors all \
  --validator \
  --base-path ~/data/node01"
tmux new -d "$node01_cmd"

node02_cmd="$HERE/catena \
  --name Node02 \
  --chain develop \
  --ws-port 9955 \
  --node-key bf4f27435f5d69ffc79738c2e3ad1c22f4d894d4e7e52eacb98e1aab40cb30af \
  --offchain-worker always \
  --rpc-cors all \
  --validator \
  --base-path ~/data/node02"
tmux new -d "$node02_cmd"