some log event description:
    my.event:
        - name: my/log_test
        - type: log
        - program: my_agent
        - level: error
        - info: 'failed'
        - timediff: 1000

some process event descritpion:
    my.event:
        - name: my/pro_test
        - type: process
        - program: my_agent
        - asure:
            connections: 3
        - timediff: 1000
