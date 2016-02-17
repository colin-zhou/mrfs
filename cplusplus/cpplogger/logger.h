#ifndef _ZZ_LOG_H_
#define _ZZ_LOG_H_

enum {
        LOG_MOD_EXCHANGE = 0,
        LOG_MOD_TUNNEL,
        LOG_MOD_QUOTE,
        LOG_MOD_SIGNAL,
        LOG_MOD_OSS,
        LOG_MOD_RSS,
        LOG_MOD_MAX
};

// log level
enum {
        LOG_PRI_CRIT = 0,
        LOG_PRI_ERROR,
        LOG_PRI_WARN,
        LOG_PRI_INFO,
        LOG_PRI_DEBUG,
        LOG_PRI_TRACE,
        LOG_PRI_MAX
};

/**
 * Reference : syslog level
 * 
 * LOG_EMERG    system is unusable
 * LOG_ALERT    action must be taken immediately
 * LOG_CRIT     critical conditions
 * LOG_ERR      error conditions
 * LOG_WARNING  warning conditions
 * LOG_NOTICE   normal, but significant, condition
 * LOG_INFO     informational message
 * LOG_DEBUG    debug-level message
 */
enum {
        LOG_SUCCESS = 0,
        LOG_ERR_CACHEFULL,
        LOG_ERR_HAS_STOPPED,
        LOG_ERR_FILE_OP,
        LOG_ERR_UNKNOWN,
        LOG_ERR_MAX
};

enum {
        LOG_STATE_INIT = 0,
        LOG_STATE_RUN,
        LOG_STATE_LASTCHANCE,
        LOG_STATE_STOPPED,
        LOG_STATE_MAX
};


#ifdef __cplusplus
extern "C" {
#endif

void
set_log_level(int level);
void log_impl(int pri, const char *format, ...);


#ifdef __cplusplus
}
#endif

// variable numbers of parameters 
#define log_fatal(format, args...) log_impl(LOG_PRI_CRIT, format, ##args)
#define log_error(format, args...) log_impl(LOG_PRI_ERROR, format, ##args)
#define log_warn(format, args...) log_impl(LOG_PRI_ERROR, format, ##args)
#define log_info(format, args...) log_impl(LOG_PRI_ERROR, format, ##args)

#if (!defined(NDEBUG) || defined(DEBUG))
 #define log_debug(format, args...) log_impl(LOG_PRI_DEBUG, format, ##args)
 #define log_trace(format, args...) log_impl(LOG_PRI_TRACE, format, ##args)
#else
 #define log_debug(format, args...) (void)0
 #define log_trace(format, args...) (void)0
#endif

#endif