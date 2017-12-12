#!/usr/bin/env bash

docker start heal-rabbit

docker exec -it heal-rabbit /bin/bash -c '
rabbitmq-plugins enable rabbitmq_management
'

docker exec -it heal-rabbit /bin/bash -c '
rabbitmqctl add_user admin Vesna2017!
rabbitmqctl set_user_tags admin administrator
rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"

rabbitmqctl add_user homestead sdf68DSppm456gsMj96Gv0

rabbitmqctl add_vhost /USERS
rabbitmqctl set_permissions -p /USERS admin ".*" ".*" ".*"
rabbitmqctl set_permissions -p /USERS homestead ".*" ".*" ".*"

rabbitmqctl add_vhost /DIAGNOSTICS
rabbitmqctl set_permissions -p /DIAGNOSTICS admin ".*" ".*" ".*"
rabbitmqctl set_permissions -p /DIAGNOSTICS homestead ".*" ".*" ".*"

rabbitmqctl add_vhost /EXERCISES
rabbitmqctl set_permissions -p /EXERCISES admin ".*" ".*" ".*"
rabbitmqctl set_permissions -p /EXERCISES homestead ".*" ".*" ".*"

rabbitmqctl add_vhost /LOGGING
rabbitmqctl set_permissions -p /LOGGING admin ".*" ".*" ".*"
rabbitmqctl set_permissions -p /LOGGING homestead ".*" ".*" ".*"
'
