# link_shortener
This portfolio app contains registration and authorization and so called link shrotener service. Tech-stack includes React, Mongo, Express and Node. So the whole app was written on JS.


## Хорошая практика
 - обрабатывать асинхронные запросы конструкцией try catch
 - в express можно добавлять бесконечное количество middleware-в при выполнении post, get,... запросов
 - nodejs воспринимает req.body как stream-ы
 - jwt токен следует хранить в localstorage
 - чтобы использовать метод в списке зависимостей useEffect, его нужно при создании обернуть в useCallback