import os

from climatemaps.datasets import HISTORIC_DATA_SETS
from climatemaps.datasets import FUTURE_DATA_SETS
from climatemaps.datasets import DIFFERENCE_DATA_SETS

DEV_MODE = os.environ.get("DEV_MODE", "false").lower() == "true"

TILE_SERVER_URL = os.environ.get("TILE_SERVER_URL", "/data")
API_BASE_URL = os.environ.get("API_BASE_URL", "/v1")
ZOOM_MAX_RASTER = int(os.environ.get("ZOOM_MAX_RASTER", "4"))

DATA_SETS_API = HISTORIC_DATA_SETS + FUTURE_DATA_SETS + DIFFERENCE_DATA_SETS

TIPPECANOE_DIR = "/usr/local/bin/"

CREATE_CONTOUR_PROCESSES = 1

# Attempt to import local overrides
try:
    from .settings_local import *  # noqa
except ImportError:
    import warnings

    warnings.warn("No settings_local.py found. Using base settings only.")
