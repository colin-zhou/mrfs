#!/bin/bash


virsh destroy linuxconfig-vm
virsh undefine linuxconfig-vm
virsh vol-delete --pool vg0 linuxconfig-vm.img
