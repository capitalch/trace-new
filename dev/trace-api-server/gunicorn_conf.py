from multiprocessing import cpu_count
# Socket Path
bind = 'unix:/home/api-server/gunicorn.sock'
# Worker Options
workers = cpu_count() + 1
worker_class = 'uvicorn.workers.UvicornWorker'
# Logging Options
loglevel = 'debug'
accesslog = '/home/api-server/logs/access_log'
errorlog =  '/home/api-server/logs/error_log'