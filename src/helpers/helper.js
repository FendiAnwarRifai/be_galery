module.exports = {
    response: (code, response, message, result, res) => {
        const resultPrint = {
            status: {
                code: code,
                response: response,
                message: message,
            },
            result: result,
        }
        res.status(code)
        res.json(resultPrint)
    }
}
