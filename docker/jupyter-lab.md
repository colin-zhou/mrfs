1. docker run -it -d -p 10000:8888 -e JUPYTER_ENABLE_LAB=yes -v "$PWD":/home/jovyan/work jupyter/datascience-notebook:9b06df75e445
2. edit ~/.jupyter/jupyter_notebook_config.py
3. .password = (ipython from notebook.auth import passwd;passwd('xxx'))
4. docker restart container
5. 
