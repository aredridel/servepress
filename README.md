servepress
==========

Serve a wordpress instance from within nodejs using PHP-FPM

Requires PHP-FPM to be installed and running on the system already.

Use
----

```
PORT=8080 servepress /path/to/wordpress
```

Systemd socket activation is also supported, letting you run wordpress instances that are integrated into a proxy via a unix socket, rather than a port number, and using template units, can even instantiate these with a consistent pattern.

`servepress@.service`

```
[Service]
ExecStart=/usr/bin/env servepress %I
StandardOutput=syslog
User=haproxy
Group=haproxy
```

This lets you use `servepress@/path/to/wordpress.service` to enable the instance.

`servepress@.socket`
```
[Socket]
ListenStream=/var/lib/haproxy/%i.sock

[Install]
WantedBy=sockets.target
```

This binds `servepress@/path/to/wordpress.socket` to `/var/lib/haproxy/-path-to-wordpress.sock`, and can be proxied to there using an http proxy that supports unix socket backends, such as the ever-excellent [haproxy](http://www.haproxy.org)
