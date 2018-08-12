var AvImageview = require("av.imageview");
Alloy.Globals.CONTENT_MODE_FIT = AvImageview.CONTENT_MODE_ASPECT_FIT;
Alloy.Globals.CONTENT_MODE_FILL = AvImageview.CONTENT_MODE_ASPECT_FILL;
Alloy.Globals.folder = (OS_ANDROID) ? Ti.Filesystem.externalStorageDirectory : Ti.Filesystem.applicationDataDirectory;
