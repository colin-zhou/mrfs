// for export the symbols out in both linux and windows
#ifdef _WIN32
     #define EXPORT_SYMBOL __declspec(dllexport)
 #else
     #define EXPORT_SYMBOL __attribute((visibility("default")))
 #endif
