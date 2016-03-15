some log event description:
    my.event:
        - location: my/log_test
        - type: log
        - program: my_agent
        - level: error
        - info: 'failed'
        - timediff: 1000
        - exec_mod: nothing

some process event descritpion:
    my.event:
        - location: my/pro_test
        - type: process
        - program: my_agent
        - params:
            running: -1
            connections: 3
        - timediff: 1000
        - exec_mod: nothing
