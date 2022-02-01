class ApiError extends Error {
  constructor(status, message) {
    super() //Это обрашение к родительскому классу, для того чтобы стал доступен вызов его функций.
    this.status = status //Status это код ошибки, который задается при описании метода у объекта ApiError.
    this.message = message //Это сообщение которое будет передаваться при вызове метода ApiError и выводиться в консоли.
  }
  // static обозначает, что это статический метод и он вызывается только через имя класса к которому приндалежит. Далее описаны методы для нашего класса ApiError.
  static badRequest(message) {
    return new ApiError(404, message) //404 обозначает 'ресурс не найден'.
  }

  static internal(message) {
    return new ApiError(500, message) //500 обозначает внутренняя ошибка сервера.
  }

  static forbiden(message) {
    return new ApiError(403, message) //403 означает доступ запрещен.
  }
}

module.exports = ApiError

//Это хендлер ошибок. Он формируется из родительского класса Error. Сюда будут перенаправляьбся все возможные инстансы ошибок в приложении.
