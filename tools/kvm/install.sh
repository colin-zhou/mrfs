#!/bin/bash


virt-install --name=linuxconfig-vm \
--hvm \
--vcpus=1 \
--memory=1024 \
--cdrom=/tmp/CentOS-7-x86_64-Minimal-1708.iso \
--virt-type=kvm \
--disk path=/opt/kvm/linuxconfig-wm.qcow2,device=disk,format=qcow2,bus=virtio,cache=writeback,size=20 \
--accelerate \
--force \
--autostart \
--os-variant=rhel7
