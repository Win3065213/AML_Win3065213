exports.jsonParseErrorHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      // console.error(err);
      return res.status(400).json({ error: 'Invalid JSON payload' });
    }
    next(err);
};

exports.generalErrorHandler = (err, req, res, next) => {
    // console.error(err);
    res.status(500).json({ error: 'Internal Server Error' })
};