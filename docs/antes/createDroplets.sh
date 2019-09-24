#!/usr/bin/env bash

for i in {3..14}
do
  doctl compute droplet create sept24-$i --size 512mb --image 52658280 --region tor1 --ssh-keys d4:ae:e4:e6:8e:ca:ef:b7:ad:0d:7e:af:50:b0:04:61
done
