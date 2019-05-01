const path = require('path')

class FileController {
  show (req, res) {
    const { file } = req.params

    // Retorna o caminho para acessar as imagens
    // Ex.:C:\code\go-stack\node\modulo2\tmp\uploads\aac29aec6d0763137c2572c6f7e94b9c.jpg
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'uploads',
      file
    )

    return res.sendFile(filePath)
  }
}

module.exports = new FileController()
