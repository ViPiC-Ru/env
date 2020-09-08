/* 0.1.3 определяет дополнительные переменные среды

cscript env.min.js [<context>] [<action>] ...

<context>   - в контексте какого компьютера получить переменные
<action>    - действие которое нужно выполнить
    silent  - последующие команды выполнить без отображения
    print   - вывести дополнительные переменные в консоль
    csv     - вывести дополнительные переменные в формате csv

*/

var env = new App({
    aptPref: 'apt',                                     // префикс в имени компьютера для определения номера аптечного пункта
    aptLen: 3,                                          // колличество цифр отведённых под номер аптечного пункта
    aptNone: 'XXX',                                     // значение для нулевого аптечного пункта
    wsPref: 'c',                                        // префикс в имени компьютера для определения номера компьютера
    wsLen: 1,                                           // колличество цифр отведённых под номер компьютера
    wsFirstDesc: 'Основной',                            // описание первого компьютера в аптечном пункте
    wsNextDesc: 'Дополнительный',                       // описание следующего компьютера в аптечном пункте
    wsNoneDesc: 'Временный',                            // описание не опознанного компьютера в аптечном пункте
    supportLogin: 'apteka',                             // логин для технической поддержки
    supportToken: 'beb120e2949d34cd65a82b16071e8836',   // токен пароль для технической поддержки
    runStyle: 1,                                        // стиль отображения запущенных программ по умолчанию
    defReturn: 99,                                      // значение возвращаемое по умолчанию
    driveMinSize: 26 * 1024 * 1024 * 1024,              // минимальный общий объём диска для резервных копий в байтах
    argWrap: '"',                                       // обрамление аргументов
    keyWrap: '%',                                       // обрамление ключей
    argDelim: ' ',                                      // разделитель значений агрументов
    getDelim: '+',                                      // разделитель который нужно заменить
    setDelim: '#',                                      // разделитель на который нужно заменить
    csvDelim: ';',                                      // разделитель значений для файла выгрузки
    envType: 'Process'                                  // тип изменяемого переменного окружения
});

// подключаем зависимые свойства приложения
(function (wsh, app, undefined) {
    app.lib.extend(app, {
        fun: {// зависимые функции частного назначения
            wql2date: function (wql) {// преобразовывает дату из запроса
                //@param date {string} - дата из запроса
                //@return {date} - преобразованная дата
                return new Date(Date.UTC(
                    1 * wql.substr(0, 4),
                    1 * wql.substr(4, 2) - 1,
                    1 * wql.substr(6, 2),
                    1 * wql.substr(8, 2),
                    1 * wql.substr(10, 2) - 1 * wql.substr(21, 4),
                    1 * wql.substr(12, 2),
                    1 * wql.substr(14, 3)
                ));
            },
            bin2key: function (bin) {// преобразовывает бинарные данные в ключ продукта
                //@param bin {binary} - бинарные данные ключа продукта
                //@return {string} - строковое значение ключа продукта
                var isWin8, list, cur, last, part, pref = 'N',
                    chars = 'BCDFGHJKMPQRTVWXY2346789',
                    key = '', offset = 52;

                list = bin.toArray();
                isWin8 = Math.floor(list[66] / 6) & 1;
                list[66] = list[66] & 247 | (isWin8 & 2) * 4;
                for (var i = 24; i > -1; i--) {// пробигаемся по индексу
                    cur = 0;// сбрасываем значение курсора
                    for (var j = 14; j > -1; j--) {// пробигаемся по индексу
                        cur = cur * 256;
                        cur = list[j + offset] + cur;
                        list[j + offset] = Math.floor(cur / 24);
                        cur = cur % 24;
                    };
                    key = chars.substr(cur, 1) + key;
                    last = cur;
                };
                if (1 == isWin8) {// если это Windows 8
                    part = key.substr(1, last);
                    key = key.substr(1).replace(part, part + pref);
                };
                // возвращаем результат
                return [// форматируем ключ
                    key.substr(0, 5),
                    key.substr(5, 5),
                    key.substr(10, 5),
                    key.substr(15, 5),
                    key.substr(20, 5)
                ].join('-');
            },
            info2str: function (info, decim, base) {// преобрзовывает число информации в строку
                //@param info {number} - колличество информации в битах или байтах
                //@param decim {number} - количество знаков после запятой
                //@param base {number} - база для преобразования
                //@return {string} - строковое значение с первой буквой степени
                var factor, value, prefix = 'КМГТПЭЗЙ';

                if (!base || base < 2) base = 1024;
                if (!decim || decim < 0) decim = 0;
                factor = Math.pow(10, decim);
                for (var i = -1; info >= base; i++) info = info / base;
                value = Math.ceil(info * factor) / factor;
                value = app.lib.num2str(value, i > -1 ? decim : 0, ',', '');
                value += ' ' + prefix.charAt(i);
                return value;
            },
            clear: function (value) {// очищает текст от лишних символов
                //@param value {string} - текс для очистки от лишних данных
                //@return {string} - очищенный текст
                value = value ? '' + value : '';
                // очищаем по полному содержимому
                if ('INVALID' == value) value = '';
                if ('To be filled by O.E.M.' == value) value = '';
                if ('Default string' == value) value = '';
                if ('empty' == value) value = '';
                if ('None' == value) value = '';
                // очищаем по переданному содержимому
                for (var i = 1, iLen = arguments.length; i < iLen; i++) {
                    value = value.replace(arguments[i], '');
                };
                // очищаем по регулярному вырожению
                return value
                    .replace(/^['"]|["']$/g, '')                // кавычки в начале и в конце
                    .replace(/^\s+|\s+$/g, '')                  // пробельные символы в начале и в конце
                    .replace(/\.+$/, '')                        // точки в конце строки
                    .replace(/\(R\)/gi, '')                     // символ патента
                    .replace(/\(Registered Trademark\)/gi, '')  // тарговая марка
                    .replace(/\(Microsoft Corporation\)/gi, '') // тарговая марка
                    .replace(/\(Корпорация Майкрософт\)/gi, '') // тарговая марка
                    .replace(/\(Майкрософт\)/gi, '')            // тарговая марка
                    .replace(/\(TM\)/gi, '')                    // символ тарговой марки
                    .replace(/\s(?=\s)/gi, '')                  // лишнии пробельные символы
                    ;
            },
            repair: function (value) {// испровляет текст для запроса
                //@param value {string} - текст для исправления
                //@return {string} - исправленный текст
                value = "'" + (value ? value : '') + "'";
                return value.replace(/\\/g, '\\\\');
            }
        },
        init: function () {// функция инициализации приложения
            var shell, fso, xml, key, value, list, locator, service, registry, method,
                param, item, items, command, id, time, drive, score, pattern, total,
                context, path, delim = '\\', benchmark = 0, index = 0,
                host = '', domain = '', user = {}, data = {};

            time = new Date();
            // получаем контекст исполения
            id = '.';// начальное значение идентификатора
            if (wsh.arguments.length > 0) {// если указан хост
                value = wsh.arguments.item(0);
                if (!value.indexOf(delim + delim) && -1 == value.indexOf(delim, 2 * delim.length)) {
                    id = context = value.substr(2 * delim.length);
                    index++;
                };
            };
            // создаём служебные объекты
            shell = new ActiveXObject('WScript.Shell');
            xml = new ActiveXObject('MSXML2.DOMDocument');
            fso = new ActiveXObject('Scripting.FileSystemObject');
            locator = new ActiveXObject('wbemScripting.Swbemlocator');
            // настраиваем служебные объекты
            locator.security_.impersonationLevel = 3;
            try {// пробуем подключиться к компьютеру
                service = locator.connectServer(id, 'root\\CIMV2');
                registry = locator.connectServer(id, 'root\\default').get('stdRegProv');
            } catch (e) { service = null; };
            if (service) {// если удалось получить доступ к сервису
                // вычисляем ключ операционной системы
                method = registry.methods_.item('getBinaryValue');
                param = method.inParameters.spawnInstance_();
                param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
                param.sSubKeyName = 'SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion';
                param.sValueName = 'DigitalProductId';
                item = registry.execMethod_(method.name, param);
                if (!item.returnValue) {// если удалось прочитать значение
                    value = app.fun.bin2key(item.uValue);// преобразовываем значение ключа
                    if (value && 'BBBBB-BBBBB-BBBBB-BBBBB-BBBBB' != value) {// если ключ не пуст
                        data['SYS-KEY'] = value;
                    };
                };
                // вычисляем характеристики операционной системы
                id = '';// сбрасываем идентификатор элимента
                response = service.execQuery(
                    "SELECT *" +
                    " FROM Win32_OperatingSystem" +
                    " WHERE primary = TRUE"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    if (value = item.systemDrive) drive = value;
                    if (value = item.localDateTime) time = app.fun.wql2date(value);
                    // характеристики
                    if (value = app.fun.clear(item.caption, 'Майкрософт', 'Microsoft', 'Edition', 'x64', ',')) data['SYS-NAME'] = value;
                    if (value = app.fun.clear(item.version)) data['SYS-VERSION'] = value;
                    if (value = item.localDateTime) data['SYS-TIME'] = app.lib.date2str(app.fun.wql2date(value), 'd.m.Y H:i:s');
                    if (value = app.fun.clear(item.systemDrive)) data['SYS-DRIVE'] = value;
                    if (value = item.installDate) data['SYS-INSTALL'] = app.lib.date2str(app.fun.wql2date(value), 'd.m.Y H:i:s');
                    if (value = item.lastBootUpTime) data['SYS-RESET'] = app.lib.date2str(app.fun.wql2date(value), 'd.m.Y H:i:s');
                    if (value = app.fun.clear(item.serialNumber)) data['SYS-SERIAL'] = value;
                    if (value = app.fun.clear(item.description)) data['SYS-DESCRIPTION'] = value;
                    data['SYS-ARCHITECTURE'] = item.osArchitecture && !item.osArchitecture.indexOf('64') ? 'x64' : 'x86';
                    // останавливаемся на первом элименте
                    break;
                };
                // вычисляем характеристики материнской платы
                id = '';// сбрасываем идентификатор элимента
                response = service.execQuery(
                    "SELECT manufacturer, product, serialNumber" +
                    " FROM Win32_BaseBoard" +
                    " WHERE hostingBoard = TRUE"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    // характеристики
                    if (value = app.fun.clear(item.product)) data['PCB-NAME'] = value;
                    if (value) if (value = app.fun.clear(item.manufacturer)) data['PCB-NAME'] = value.split(' ')[0] + ' ' + app.fun.clear(item.product);
                    if (value = app.fun.clear(item.serialNumber)) data['PCB-SERIAL'] = value;
                    // останавливаемся на первом элименте
                    break;
                };
                // вычисляем характеристики сетевого соединения
                id = '';// сбрасываем идентификатор элимента
                response = service.execQuery(
                    "SELECT *" +
                    " FROM Win32_NetworkAdapterConfiguration" +
                    " WHERE ipEnabled = TRUE"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    if (value = item.interfaceIndex) id = value;
                    // основной адрес 
                    if (null != item.ipAddress) {// если есть список ip адресов
                        list = item.ipAddress.toArray();// получаем очередной список
                        for (var i = 0, iLen = list.length; i < iLen; i++) {
                            value = app.fun.clear(list[i]);// получаем очередное значение
                            if (value && -1 != value.indexOf('.') && !data['NET-IP-V4']) data['NET-IP-V4'] = value;
                            if (value && -1 == value.indexOf('.') && !data['NET-IP-V6']) data['NET-IP-V6'] = value;
                        };
                    };
                    // основной шлюз
                    if (null != item.defaultIPGateway) {// если есть список ip адресов
                        list = item.defaultIPGateway.toArray();// получаем очередной список
                        for (var i = 0, iLen = list.length; i < iLen; i++) {
                            value = app.fun.clear(list[i]);// получаем очередное значение
                            if (value && -1 != value.indexOf('.') && !data['NET-GATEWAY-V4']) data['NET-GATEWAY-V4'] = value;
                            if (value && -1 == value.indexOf('.') && !data['NET-GATEWAY-V6']) data['NET-GATEWAY-V6'] = value;
                        };
                    };
                    // основной dns
                    if (null != item.dnsServerSearchOrder) {// если есть список ip адресов
                        list = item.dnsServerSearchOrder.toArray();// получаем очередной список
                        for (var i = 0, iLen = list.length; i < iLen; i++) {
                            value = app.fun.clear(list[i]);// получаем очередное значение
                            if (value && -1 != value.indexOf('.') && !data['NET-DNS-V4']) data['NET-DNS-V4'] = value;
                            if (value && -1 == value.indexOf('.') && !data['NET-DNS-V6']) data['NET-DNS-V6'] = value;
                        };
                    };
                    // основная маска
                    if (null != item.ipSubnet) {// если есть список ip адресов
                        list = item.ipSubnet.toArray();// получаем очередной список
                        for (var i = 0, iLen = list.length; i < iLen; i++) {
                            value = app.fun.clear(list[i]);// получаем очередное значение
                            if (value && -1 != value.indexOf('.') && !data['NET-SUBNET-V4']) data['NET-SUBNET-V4'] = value;
                            if (value && -1 == value.indexOf('.') && !data['NET-SUBNET-V6']) data['NET-SUBNET-V6'] = value;
                        };
                    };
                    // характеристики
                    if (value = app.fun.clear(item.dhcpServer)) data['NET-DHCP-V4'] = value;
                    if (value = app.fun.clear(item.description, 'Сетевой адаптер', 'Адаптер', 'для виртуальной сети', 'Сетевая карта', 'Контроллер', 'NIC (NDIS 6.20)', '- Минипорт планировщика пакетов')) data['NET-NAME'] = value;
                    if (value = app.fun.clear(item.macAddress)) data['NET-MAC'] = value;
                    // останавливаемся на первом элименте
                    break;
                };
                // вычисляем характеристики сетевого адаптера
                score = 0;// обнуляем текущую оценку
                response = service.execQuery(
                    "SELECT speed, timeOfLastReset" +
                    " FROM Win32_NetworkAdapter" +
                    " WHERE netEnabled = TRUE" +
                    " AND interfaceIndex = " + app.fun.repair(id)
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    // характеристики
                    if (value = item.speed) data['NET-SPEED'] = app.fun.info2str(value, 0, 1000) + 'бит/с';
                    if (value = item.speed) data['NET-SPEED-VAL'] = value;
                    if (value = item.timeOfLastReset) data['NET-RESET'] = app.lib.date2str(app.fun.wql2date(value), 'd.m.Y H:i:s');
                    // косвенно считаем производительность
                    if (value = item.speed) score += 8.12567 * Math.sqrt(value / 100 / 1000 / 1000);
                    // останавливаемся на первом элименте
                    break;
                };
                if (score) benchmark = benchmark ? Math.min(benchmark, score) : score;
                // вычисляем характеристики сетевой идентификации
                id = '';// сбрасываем идентификатор элимента
                response = service.execQuery(
                    "SELECT *" +
                    " FROM Win32_ComputerSystem"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    if (value = item.dnsHostName) host = value;
                    if (value = item.name) if (!host) host = value.toLowerCase();
                    if (item.domain != item.workgroup) domain = item.domain;
                    if (value = item.userName) user.login = id = value;
                    if (value = item.userName) user.domain = value.split(delim)[0];
                    if (value = item.userName) user.account = value.split(delim)[1];
                    // характеристики
                    if (value = app.fun.clear(host)) data['NET-HOST'] = value;
                    if (value = app.fun.clear(item.domain)) data['NET-DOMAIN'] = value;
                    if (value = app.fun.clear(user.login)) data['USR-LOGIN'] = value;
                    if (value = app.fun.clear(user.domain)) data['USR-DOMAIN'] = value;
                    if (value = app.fun.clear(user.account)) data['USR-ACCOUNT'] = value;
                    // останавливаемся на первом элименте
                    break;
                };
                // поправка на старые операционные системы
                if (!id) {// если идентификатор пользователя неопределён
                    list = [];// сбрасываем список значений
                    // вычисляем имя пользователя поумолчанию
                    method = registry.methods_.item('getStringValue');
                    param = method.inParameters.spawnInstance_();
                    param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
                    param.sSubKeyName = 'SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon';
                    param.sValueName = 'DefaultDomainName';
                    item = registry.execMethod_(method.name, param);
                    if (!item.returnValue && item.sValue) list.push(item.sValue);
                    // вычисляем домен пользователя поумолчанию
                    method = registry.methods_.item('getStringValue');
                    param = method.inParameters.spawnInstance_();
                    param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
                    param.sSubKeyName = 'SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon';
                    param.sValueName = 'DefaultUserName';
                    item = registry.execMethod_(method.name, param);
                    if (!item.returnValue && item.sValue) list.push(item.sValue);
                    // формируем идентификатор пользователя
                    if (2 == list.length) user.login = id = list.join(delim);
                    if (2 == list.length) user.domain = list[0];
                    if (2 == list.length) user.account = list[1];
                    // характеристики
                    if (value = app.fun.clear(user.login)) data['USR-LOGIN'] = value;
                    if (value = app.fun.clear(user.domain)) data['USR-DOMAIN'] = value;
                    if (value = app.fun.clear(user.account)) data['USR-ACCOUNT'] = value;
                };
                // вычисляем характеристики пользователя
                response = service.execQuery(
                    "SELECT fullName, sid" +
                    " FROM Win32_UserAccount" +
                    " WHERE domain = " + app.fun.repair(user.domain) +
                    " AND name = " + app.fun.repair(user.account)
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    if (value = item.sid) user.sid = id = value;
                    // характеристики
                    if (value = app.fun.clear(item.fullName)) data['USR-NAME'] = value;
                    if (value = app.fun.clear(user.sid)) data['USR-SID'] = value;
                    // останавливаемся на первом элименте
                    break;
                };
                // поправка для доменных пользователей
                try {// пробуем подключиться к домену
                    (function () {// замыкаем для локальных переменных
                        var service = locator.connectServer(domain, 'root\\CIMV2');
                        // вычисляем характеристики доменного пользователя
                        response = service.execQuery(
                            "SELECT fullName, sid" +
                            " FROM Win32_UserAccount" +
                            " WHERE domain = " + app.fun.repair(user.domain) +
                            " AND name = " + app.fun.repair(user.account)
                        );
                        items = new Enumerator(response);
                        while (!items.atEnd()) {// пока не достигнут конец
                            item = items.item();// получаем очередной элимент коллекции
                            items.moveNext();// переходим к следующему элименту
                            if (value = item.sid) user.sid = id = value;
                            // характеристики
                            if (value = app.fun.clear(item.fullName)) data['USR-NAME'] = value;
                            if (value = app.fun.clear(user.sid)) data['USR-SID'] = value;
                            // останавливаемся на первом элименте
                            break;
                        };
                    })();
                } catch (e) { };
                // вычисляем характеристики профиля пользователя
                response = service.execQuery(
                    "SELECT localPath" +
                    " FROM Win32_UserProfile" +
                    " WHERE sid = " + app.fun.repair(user.sid)
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    // характеристики
                    if (value = app.fun.clear(item.localPath)) data['USR-PROFILE'] = value;
                    // останавливаемся на первом элименте
                    break;
                };
                // вычисляем характеристики домашней папки
                response = service.execQuery(
                    "SELECT homeDirectory" +
                    " FROM Win32_NetworkLoginProfile" +
                    " WHERE name = " + app.fun.repair(user.login)
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    // характеристики
                    if (value = app.fun.clear(item.homeDirectory)) data['USR-HOME'] = value;
                    // останавливаемся на первом элименте
                    break;
                };
                // вычисляем характеристики центрального процессора
                score = 0;// обнуляем текущую оценку
                id = '';// сбрасываем идентификатор элимента
                response = service.execQuery(
                    "SELECT architecture, maxClockSpeed, name, revision, numberOfCores, socketDesignation" +
                    " FROM Win32_Processor" +
                    " WHERE role = 'CPU'"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    // характеристики
                    if (0 == item.architecture) data['CPU-ARCHITECTURE'] = 'x86';
                    else if (9 == item.architecture) data['CPU-ARCHITECTURE'] = 'x64';
                    if (value = item.maxClockSpeed) data['CPU-SPEED'] = app.fun.info2str(value * 1000 * 1000, 2, 1000) + 'Гц';
                    if (value = item.maxClockSpeed) data['CPU-SPEED-VAL'] = value * 1000 * 1000;
                    if (value = app.fun.clear(item.name, 'CPU', 'APU', 'Процессор', 'Processor', 'with', 'Radeon HD Graphics')) data['CPU-NAME'] = value;
                    if (value = app.fun.clear(item.revision)) data['CPU-VERSION'] = value;
                    if (value = item.numberOfCores) data['CPU-CORE'] = value;
                    if (value = app.fun.clear(item.socketDesignation, 'SOCKET 0')) data['CPU-SOCKET'] = value;
                    // косвенно считаем производительность
                    if (value = item.maxClockSpeed) score += 2.26143 * Math.sqrt(value / 1000);
                    if (value = item.numberOfCores) score *= 1.02033 * Math.sqrt(value);
                    // останавливаемся на первом элименте
                    break;
                };
                if (score) benchmark = benchmark ? Math.min(benchmark, score) : score;
                // вычисляем характеристики кеша процессора
                id = '';// сбрасываем идентификатор элимента
                response = service.execQuery(
                    "SELECT level, maxCacheSize" +
                    " FROM Win32_CacheMemory"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    // характеристики
                    if (value = item.maxCacheSize) data['CPU-CACHE-L' + (item.level - 2)] = app.fun.info2str(value * 1024, 0) + 'Б';
                };
                // вычисляем характеристики оперативной памяти
                score = 0;// обнуляем текущую оценку
                total = 0;// обнуляем значение для суммирования
                id = '';// сбрасываем идентификатор элимента
                response = service.execQuery(
                    "SELECT capacity, speed" +
                    " FROM Win32_PhysicalMemory"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    // характеристики
                    if (value = item.capacity) data['RAM-SIZE-VAL'] = total += 1 * value;
                    if (value = item.capacity) data['RAM-SIZE'] = app.fun.info2str(total, 0) + 'Б';
                    if (value = item.speed) data['RAM-SPEED'] = value + ' МГц';
                    if (value = item.speed) data['RAM-SPEED-VAL'] = value * 1000 * 1000;
                    // косвенно считаем производительность
                    if (value = total) score = 2.51143 * Math.sqrt(value / 1024 / 1024 / 1024);
                    if (value = item.speed) score *= 0.92245 * Math.sqrt(value / 1000);
                };
                if (score) benchmark = benchmark ? Math.min(benchmark, score) : score;
                // вычисляем характеристики графического процессора
                id = '';// сбрасываем идентификатор элимента
                response = service.execQuery(
                    "SELECT adapterRam, name, driverVersion, currentHorizontalResolution, currentRefreshRate, currentBitsPerPixel, currentVerticalResolution" +
                    " FROM Win32_VideoController"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    // характеристики
                    if (value = item.adapterRam) data['GPU-SIZE'] = app.fun.info2str(Math.abs(value), 0) + 'Б';
                    if (value = item.adapterRam) data['GPU-SIZE-VAL'] = Math.abs(value);
                    if (value = app.fun.clear(item.name, 'GPU', 'Видеоустройство', 'Family', 'Chipset', 'Series', 'Graphics')) data['GPU-NAME'] = value;
                    if (value = app.fun.clear(item.driverVersion)) data['GPU-VERSION'] = value;
                    if (item.currentHorizontalResolution && item.currentVerticalResolution) data['GPU-RESOLUTION'] = item.currentHorizontalResolution + ' x ' + item.currentVerticalResolution;
                    if (value = item.currentHorizontalResolution) data['GPU-RESOLUTION-X'] = value;
                    if (value = item.currentVerticalResolution) data['GPU-RESOLUTION-Y'] = value;
                    if (value = item.currentRefreshRate) data['GPU-FREQUENCY'] = app.fun.info2str(value, 0, 1000) + 'Гц';
                    if (value = item.currentRefreshRate) data['GPU-FREQUENCY-VAL'] = value;
                    if (value = item.currentBitsPerPixel) data['GPU-COLOR'] = app.fun.info2str(value, 0) + 'бит' + app.lib.numDeclin(value, '', '', 'а');
                    if (value = item.currentBitsPerPixel) data['GPU-COLOR-VAL'] = value;
                    // останавливаемся на первом элименте
                    break;
                };
                // вычисляем дисковую подсистему
                score = 0;// обнуляем текущую оценку
                id = '';// сбрасываем идентификатор элимента
                response = service.execQuery(
                    "SELECT *" +
                    " FROM Win32_DiskDrive"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    // определяем тип насителя
                    switch (item.mediaType) {// поддерживаемые типы
                        case 'Removable Media':
                            key = 'USB';
                            break;
                        case 'Fixed	hard disk media':
                        case 'Fixed hard disk media':
                            if (item.caption && -1 != item.caption.indexOf('Solid')) key = 'SSD';
                            else if (item.caption && -1 != item.caption.indexOf('SSD')) key = 'SSD';
                            else if (item.caption && !item.caption.indexOf('ADATA')) key = 'SSD';
                            else key = 'HDD';
                            break;
                        default:
                            key = '';
                    };
                    // пропускаем непонятные и повторяющийся типы насителя
                    if (item.caption && -1 != item.caption.indexOf('Raid')) continue;
                    if (!key || data[key + '-NAME']) continue;
                    // характеристики
                    if (value = app.fun.clear(item.caption, 'ATA Device', 'SCSI Disk Device', 'USB Device', 'SSD')) data[key + '-NAME'] = value;
                    if (value = app.fun.clear(item.firmwareRevision)) data[key + '-VERSION'] = value;
                    if (value = app.fun.clear(item.interfaceType)) data[key + '-TYPE'] = value;
                    if (value = app.fun.clear(item.serialNumber)) data[key + '-SERIAL'] = value;
                    if (value = item.size) data[key + '-SIZE'] = app.fun.info2str(value, 0) + 'Б';
                    if (value = item.size) data[key + '-SIZE-VAL'] = value;
                    // косвенно считаем производительность
                    if (value = key) score = Math.max(score, 'SDD' == value ? 15.51143 : 7.14577);
                };
                if (score) benchmark = benchmark ? Math.min(benchmark, score) : score;
                // вычисляем оптический накопитель
                id = '';// сбрасываем идентификатор элимента
                response = service.execQuery(
                    "SELECT mediaType, caption, drive" +
                    " FROM Win32_CDROMDrive"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    if (item.caption && -1 != item.caption.indexOf('Alcohol')) continue;
                    if (item.caption && -1 != item.caption.indexOf('Virtual')) continue;
                    // определяем тип насителя
                    switch (item.mediaType) {// поддерживаемые типы
                        case 'CD-ROM': data['ROM-TYPE'] = 'CD'; break;
                        case 'DVD-ROM': data['ROM-TYPE'] = 'DVD'; break;
                        case 'CD Writer': data['ROM-TYPE'] = 'CD-RW'; break;
                        case 'DVD Writer': data['ROM-TYPE'] = 'DVD-RW'; break;
                    };
                    // характеристики
                    if (value = app.fun.clear(item.caption, 'ATA Device', 'SCSI CdRom Device')) data['ROM-NAME'] = value;
                    if (value = app.fun.clear(item.drive)) data['ROM-DRIVE'] = value;
                    // останавливаемся на первом элименте
                    break;
                };
                // вычисляем букву диска для резервных копий
                id = '';// сбрасываем идентификатор элимента
                response = service.execQuery(
                    "SELECT caption, size" +
                    " FROM Win32_LogicalDisk" +
                    " WHERE driveType = 2 OR driveType = 3 OR driveType = 4"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    if (item.caption && -1 != item.caption.indexOf(drive) || data['BAK-DRIVE']) continue;
                    // характеристики
                    if (value = app.fun.clear(item.caption)) if (item.size >= app.val.driveMinSize) data['BAK-DRIVE'] = value;
                };
                // ищем корневую папку программы eFarma
                id = '';// сбрасываем идентификатор элимента
                key = 'DisplayIcon';// ключ для проверки
                list = [// список путей для проверки
                    'SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\F3 TAIL',
                    'SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\F3 TAIL',
                    'SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\еФарма',
                    'SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\еФарма'
                ];
                value = '';// сбрасываем значение переменной
                method = registry.methods_.item('getStringValue');
                for (var i = 0, iLen = list.length; i < iLen && !value; i++) {
                    param = method.inParameters.spawnInstance_();
                    param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
                    param.sSubKeyName = list[i];
                    param.sValueName = key;
                    item = registry.execMethod_(method.name, param);
                    if (!item.returnValue && item.sValue) value = app.fun.clear(item.sValue);
                };
                if (value) {// если удалось получить значение
                    list = value.split(delim);
                    list.pop();// удаляем последнай элимент
                    list.pop();// удаляем последнай элимент
                    // характеристики
                    id = list.join(delim);
                    data['APP-EFARMA-DIR'] = id;
                };
                // ищем путь до клиента eFarma
                path = '';// сбрасываем значение
                key = '\\Client\\ePlus.Client.exe';
                list = [// список путей для проверки
                    id
                ];
                value = '';// сбрасываем значение для запроса
                for (var i = 0, iLen = list.length; i < iLen; i++) {
                    if (i) value += ' OR ';// добавляем разделитель
                    value += 'name = ' + app.fun.repair(list[i] + key);
                };
                response = service.execQuery(
                    "SELECT name" +
                    " FROM CIM_DataFile" +
                    " WHERE " + value
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    for (var i = 0, iLen = list.length; i < iLen; i++) {
                        value = list[i] + key;// конечное значение
                        if (item.name && item.name.toLowerCase() == value.toLowerCase()) {
                            // характеристики
                            data['APP-EFARMA-CLIENT'] = path = value;
                            // останавливаемся на первом элименте
                            break;
                        };
                    };
                };
                // получаем данные из файла настроек клиента eFarma
                if (path) {// если найден путь
                    key = 'ConnectionString';// ключевой атрибут тега с данными
                    value = path + '.Config';// полный локальный путь до файла
                    if (context) value = [delim, context, value.replace(':', '$')].join(delim);
                    if (fso.fileExists(value) && xml.load(value)) {// если файл успешно загружен
                        items = xml.getElementsByTagName('appSettings');// список элиментов
                        for (var i = 0, iLen = items.length; i < iLen; i++) {// пробигаемся по элиментам
                            for (var j = 0, jLen = items.item(i).childNodes.length; j < jLen; j++) {
                                item = items.item(i).childNodes.item(j);// получаем очередной дочерний элимент
                                if (1 == item.nodeType && key == item.getAttribute('key')) {// если строка подключения
                                    value = item.getAttribute('value');// получаем значение строки подключения
                                    item = app.lib.str2obj(value, false, ';', '=');// преобразуем в объект
                                    // характеристики
                                    if (value = item['Data Source']) data['APP-EFARMA-CLIENT-SERVER'] = value;
                                    if (value = item['Initial Catalog']) data['APP-EFARMA-CLIENT-BASE'] = value;
                                    if (value = item['User ID']) data['APP-EFARMA-CLIENT-LOGIN'] = value;
                                    if (value = item['Password']) data['APP-EFARMA-CLIENT-PASSWORD'] = value;
                                    // останавливаемся на первом элименте
                                    break;
                                };
                            };
                        };
                    };
                };
                // ищем путь до кассы eFarma
                path = '';// сбрасываем значение
                key = '\\ARM\\ePlus.ARMCasherNew.exe';
                list = [// список путей для проверки
                    id
                ];
                value = '';// сбрасываем значение для запроса
                for (var i = 0, iLen = list.length; i < iLen; i++) {
                    if (i) value += ' OR ';// добавляем разделитель
                    value += 'name = ' + app.fun.repair(list[i] + key);
                };
                response = service.execQuery(
                    "SELECT name" +
                    " FROM CIM_DataFile" +
                    " WHERE " + value
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    for (var i = 0, iLen = list.length; i < iLen; i++) {
                        value = list[i] + key;// конечное значение
                        if (item.name && item.name.toLowerCase() == value.toLowerCase()) {
                            // характеристики
                            data['APP-EFARMA-CASHER'] = path = value;
                            // останавливаемся на первом элименте
                            break;
                        };
                    };
                };
                // получаем данные из файла настроек кассы eFarma
                if (path) {// если найден путь
                    key = 'LocalConnectionString';// ключевой атрибут тега с данными
                    value = path + '.Config';// полный локальный путь до файла
                    if (context) value = [delim, context, value.replace(':', '$')].join(delim);
                    if (fso.fileExists(value) && xml.load(value)) {// если файл успешно загружен
                        items = xml.getElementsByTagName('appSettings');// список элиментов
                        for (var i = 0, iLen = items.length; i < iLen; i++) {// пробигаемся по элиментам
                            for (var j = 0, jLen = items.item(i).childNodes.length; j < jLen; j++) {
                                item = items.item(i).childNodes.item(j);// получаем очередной дочерний элимент
                                if (1 == item.nodeType && key == item.getAttribute('key')) {// если строка подключения
                                    value = item.getAttribute('value');// получаем значение строки подключения
                                    item = app.lib.str2obj(value, false, ';', '=');// преобразуем в объект
                                    // характеристики
                                    if (value = item['Data Source']) data['APP-EFARMA-CASHER-SERVER'] = value;
                                    if (value = item['Initial Catalog']) data['APP-EFARMA-CASHER-BASE'] = value;
                                    if (value = item['User ID']) data['APP-EFARMA-CASHER-LOGIN'] = value;
                                    if (value = item['Password']) data['APP-EFARMA-CASHER-PASSWORD'] = value;
                                    // останавливаемся на первом элименте
                                    break;
                                };
                            };
                        };
                    };
                };
                // ищем путь до сервера обновлений eFarma
                path = '';// сбрасываем значение
                key = '\\UpdateServer\\ePlus.UpdateServer.exe';
                list = [// список путей для проверки
                    id
                ];
                value = '';// сбрасываем значение для запроса
                for (var i = 0, iLen = list.length; i < iLen; i++) {
                    if (i) value += ' OR ';// добавляем разделитель
                    value += 'name = ' + app.fun.repair(list[i] + key);
                };
                response = service.execQuery(
                    "SELECT name" +
                    " FROM CIM_DataFile" +
                    " WHERE " + value
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    for (var i = 0, iLen = list.length; i < iLen; i++) {
                        value = list[i] + key;// конечное значение
                        if (item.name && item.name.toLowerCase() == value.toLowerCase()) {
                            // характеристики
                            data['APP-EFARMA-UPDATER'] = path = value;
                            // останавливаемся на первом элименте
                            break;
                        };
                    };
                };
                // получаем данные из файла настроек сервера обновлений eFarma
                if (path) {// если найден путь
                    value = path + '.Config';// полный локальный путь до файла
                    if (context) value = [delim, context, value.replace(':', '$')].join(delim);
                    if (fso.fileExists(value) && xml.load(value)) {// если файл успешно загружен
                        items = xml.getElementsByTagName('appSettings');// список элиментов
                        for (var i = 0, iLen = items.length; i < iLen; i++) {// пробигаемся по элиментам
                            for (var j = 0, jLen = items.item(i).childNodes.length; j < jLen; j++) {
                                item = items.item(i).childNodes.item(j);// получаем очередной дочерний элимент
                                if (1 == item.nodeType) {// если это тег с данными
                                    value = item.getAttribute('value');// получаем значение
                                    switch (item.getAttribute('key')) {// поддерживаемые ключевые атрибуты
                                        case 'LocalUrl': if (value) data['APP-EFARMA-UPDATE-DIR'] = value; break;
                                        case 'BackupDbFolder': if (value) data['APP-EFARMA-BACKUP-DIR'] = value; break;
                                    };
                                };
                            };
                        };
                    };
                };
                // ищем путь до файла лицензии eFarma
                key = 'lic';
                list = [// список путей для проверки
                    id + '\\UpdateServer\\',
                    id + '\\Client\\',
                    id + '\\ARM\\'
                ];
                value = '';// сбрасываем значение для запроса
                for (var i = 0, iLen = list.length; i < iLen; i++) {
                    if (i) value += ' OR ';// добавляем разделитель
                    value += 'drive = ' + app.fun.repair(app.lib.strim(list[i], '', ':', true, false)) + ' ';
                    value += 'AND path = ' + app.fun.repair(app.lib.strim(list[i], ':', '', false, false)) + ' ';
                    value += 'AND extension = ' + app.fun.repair(key);
                };
                response = service.execQuery(
                    "SELECT name, fileName" +
                    " FROM CIM_DataFile" +
                    " WHERE " + value
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    for (var i = 0, iLen = list.length; i < iLen; i++) {
                        value = list[i] + item.fileName + '.' + key;// конечное значение
                        if (item.name && item.name.toLowerCase() == value.toLowerCase()) {
                            // характеристики
                            data['APP-EFARMA-LICENSE'] = value;
                            // останавливаемся на первом элименте
                            break;
                        };
                    };
                };
                // ищем корневую папку программы УЛУС
                id = '';// сбрасываем идентификатор элимента
                value = app.lib.date2str(time, 'Y');
                key = '\\ULUS.exe';
                list = [// список путей для проверки
                    'C:\\SoftLink\\Ulus\\' + value,
                    'C:\\LO\\ULUS\\' + value,
                    'C:\\so\\Ulus\\' + value,
                    'C:\\ULUS\\' + value
                ];
                value = '';// сбрасываем значение для запроса
                for (var i = 0, iLen = list.length; i < iLen; i++) {
                    if (i) value += ' OR ';// добавляем разделитель
                    value += 'name = ' + app.fun.repair(list[i] + key);
                };
                response = service.execQuery(
                    "SELECT name" +
                    " FROM CIM_DataFile" +
                    " WHERE " + value
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    for (var i = 0, iLen = list.length; i < iLen; i++) {
                        value = list[i] + key;// конечное значение
                        if (item.name && item.name.toLowerCase() == value.toLowerCase()) {
                            // характеристики
                            data['APP-ULUS'] = value;
                            data['APP-ULUS-DIR'] = list[i];
                            // останавливаемся на первом элименте
                            break;
                        };
                    };
                };
                // ищем корневую папку программы Chrome
                id = '';// сбрасываем идентификатор элимента
                key = '';// ключ для проверки
                list = [// список путей для проверки
                    'SOFTWARE\\Clients\\StartMenuInternet\\Google Chrome\\shell\\open\\command',
                    'SOFTWARE\\WOW6432Node\\Clients\\StartMenuInternet\\Google Chrome\\shell\\open\\command'
                ];
                value = '';// сбрасываем значение переменной
                method = registry.methods_.item('getStringValue');
                for (var i = 0, iLen = list.length; i < iLen && !value; i++) {
                    param = method.inParameters.spawnInstance_();
                    param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
                    param.sSubKeyName = list[i];
                    param.sValueName = key;
                    item = registry.execMethod_(method.name, param);
                    if (!item.returnValue && item.sValue) value = app.fun.clear(item.sValue);
                };
                if (value) {// если удалось получить значение
                    list = value.split(delim);
                    list.pop();// удаляем последнай элимент
                    // характеристики
                    data['APP-CHROME'] = value;
                    data['APP-CHROME-DIR'] = list.join(delim);
                };
                // ищем корневую папку программы VLC
                id = '';// сбрасываем идентификатор элимента
                key = '';// ключ для проверки
                list = [// список путей для проверки
                    'SOFTWARE\\VideoLAN\\VLC',
                    'SOFTWARE\\WOW6432Node\\VideoLAN\\VLC'
                ];
                value = '';// сбрасываем значение переменной
                method = registry.methods_.item('getStringValue');
                for (var i = 0, iLen = list.length; i < iLen && !value; i++) {
                    param = method.inParameters.spawnInstance_();
                    param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
                    param.sSubKeyName = list[i];
                    param.sValueName = key;
                    item = registry.execMethod_(method.name, param);
                    if (!item.returnValue && item.sValue) value = app.fun.clear(item.sValue);
                };
                if (value) {// если удалось получить значение
                    list = value.split(delim);
                    list.pop();// удаляем последнай элимент
                    // характеристики
                    data['APP-VLC'] = value;
                    data['APP-VLC-DIR'] = list.join(delim);
                };
                // вычисляем идентификатор TeamViewer
                id = '';// сбрасываем идентификатор элимента
                key = 'ClientID';// ключ для проверки
                list = [// список путей для проверки
                    'SOFTWARE\\TeamViewer',
                    'SOFTWARE\\WOW6432Node\\TeamViewer'
                ];
                value = '';// сбрасываем значение переменной
                method = registry.methods_.item('getDWORDValue');
                for (var i = 0, iLen = list.length; i < iLen && !value; i++) {
                    param = method.inParameters.spawnInstance_();
                    param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
                    param.sSubKeyName = list[i];
                    param.sValueName = key;
                    item = registry.execMethod_(method.name, param);
                    if (!item.returnValue && item.uValue) value = app.fun.clear(item.uValue);
                };
                if (value) {// если удалось получить значение
                    // характеристики
                    data['APP-TEAMVIEWER-ID'] = value;
                };
                // вычисляем номер аптечного пункта
                value = host.toLowerCase();
                if (0 == value.indexOf(app.val.aptPref)) {// если это компьютер в аптеки
                    value = value.substr(app.val.aptPref.length, app.val.aptLen);
                    if (!isNaN(value)) {// если удалось получить номер аптеки
                        data['APT-NUMBER'] = value || app.val.aptNone;
                        data['APT-NUMBER-VAL'] = Number(value);
                    };
                };
                // вычисляем номер компьютера в аптечном пункте
                value = host.toLowerCase();
                if (0 == value.indexOf(app.val.aptPref)) {// если это компьютер в аптеки
                    value = value.substr(app.val.aptPref.length + app.val.aptLen);
                    if (value) {// если это не основной компьютер в аптечном пункте
                        if (0 == value.indexOf(app.val.wsPref)) {// если это дополнительный компьютер
                            value = value.substr(app.val.wsPref.length, app.val.wsLen);
                            if (!isNaN(value)) {// если удалось получить номер компьютера
                                value = Number(value);
                            } else value = 0;
                        } else value = 0;
                    } else value = 1;
                    data['APT-COMPUTER-VAL'] = value;
                    if (0 == value) data['APT-COMPUTER'] = app.val.wsNoneDesc;
                    else if (1 == value) data['APT-COMPUTER'] = app.val.wsFirstDesc;
                    else data['APT-COMPUTER'] = app.val.wsNextDesc;
                };
                // вычисляем реквизиты технической поддержки
                value = host.toLowerCase();
                if (0 == value.indexOf(app.val.aptPref)) {// если это компьютер в аптеки
                    value = value.substr(app.val.aptPref.length, app.val.aptLen);
                    if (!isNaN(value)) {// если удалось получить номер аптеки
                        list = [app.val.supportLogin, Number(value), app.val.supportToken];
                        data['APT-SUPPORT-HASH'] = app.lib.md5(list.join(''));
                        data['APT-SUPPORT-LOGIN'] = app.val.supportLogin;
                    };
                };
                // вычисляем сумарное название компьютера
                list = [];// очищаем значение переменной
                if (data['CPU-NAME'] && data['CPU-CORE'] && data['CPU-SPEED']) list.push(app.fun.clear(data['CPU-NAME'].replace('Dual-Core', 'Intel'), 'Dual Core', 'Xeon', 'Pentium', 'Celeron', 'Core2 Duo', 'Core', 'Processor', 'Athlon 64', 'Athlon', /,.+/, /@.+/, /\d\.d+GHz/) + ' ' + data['CPU-CORE'] + 'x' + data['CPU-SPEED'].replace(',', '.').replace(' МГц', 'M').replace(' ГГц', 'G') + 'Hz');
                if (data['RAM-SIZE'] && data['RAM-SPEED']) list.push(data['RAM-SIZE'].replace(' МБ', 'MB').replace(' ГБ', 'GB') + ' ' + data['RAM-SPEED'].replace(' МГц', 'M').replace(' ГГц', 'G') + 'Hz');
                if (data['GPU-SIZE'] && data['GPU-NAME'] && (-1 != data['GPU-NAME'].indexOf('GeForce') || -1 != data['GPU-NAME'].indexOf('Radeon'))) list.push(data['GPU-SIZE'].replace(' МБ', 'MB').replace(' ГБ', 'GB') + ' ' + app.fun.clear(data['GPU-NAME'], 'AMD', 'NVIDIA', 'GeForce', 'Radeon', /\(.+/));
                if (data['HDD-SIZE']) list.push(data['HDD-SIZE'].replace(' МБ', 'MB').replace(' ГБ', 'GB').replace(' ТБ', 'TB') + ' HDD');
                if (data['SSD-SIZE']) list.push(data['SSD-SIZE'].replace(' МБ', 'MB').replace(' ГБ', 'GB').replace(' ТБ', 'TB') + ' SSD');
                if (data['USB-SIZE']) list.push(data['USB-SIZE'].replace(' МБ', 'MB').replace(' ГБ', 'GB').replace(' ТБ', 'TB') + ' USB');
                if (data['ROM-TYPE']) list.push(data['ROM-TYPE']);
                if (list.length) data['DEV-NAME'] = list.join('/');
                // вычисляем конечный индекс производительности
                if (benchmark) data['DEV-BENCHMARK'] = app.lib.num2str(benchmark, 5, ',', '');
            };
            // добавляем новые переменные во временное окружение
            items = shell.environment(app.val.envType);
            for (var key in data) {// пробигаемся по списку с данными
                value = data[key];// получаем очередное значение
                setEnv(items, key, value);
            };
            // готовим командную строку для вызова
            items = [];// сбрасываем список аргументов
            for (var i = 0, iLen = wsh.arguments.length - index; i < iLen; i++) {
                value = wsh.arguments.item(i + index);// получаем очередное значение аргуумента
                value = value.split(app.val.getDelim).join(app.val.setDelim);
                // поправка на служебные параметры
                if (!i && 'silent' == value) app.val.runStyle = 0;
                else if (!i && 'print' == value) wsh.echo(app.lib.obj2str(data, false, '\r\n', ' = '));
                else if (!i && 'csv' == value) {// если необходимо выгрузить
                    list = [// список выводимых данных
                        'SYS-KEY', 'SYS-NAME', 'SYS-VERSION', 'SYS-TIME', 'SYS-ARCHITECTURE', 'SYS-DRIVE', 'SYS-INSTALL', 'SYS-RESET', 'SYS-SERIAL',
                        'PCB-NAME', 'PCB-SERIAL',
                        'NET-IP-V4', 'NET-GATEWAY-V4', 'NET-DNS-V4', 'NET-SUBNET-V4', 'NET-DHCP-V4', 'NET-NAME', 'NET-MAC', 'NET-SPEED', 'NET-RESET', 'NET-HOST', 'NET-DOMAIN',
                        'USR-LOGIN', 'USR-DOMAIN', 'USR-ACCOUNT', 'USR-NAME', 'USR-SID', 'USR-PROFILE',
                        'CPU-ARCHITECTURE', 'CPU-SPEED', 'CPU-NAME', 'CPU-CORE', 'CPU-SOCKET', 'CPU-CACHE-L1', 'CPU-CACHE-L2', 'CPU-CACHE-L3',
                        'RAM-SIZE', 'RAM-SPEED', 'GPU-SIZE', 'GPU-NAME', 'GPU-VERSION', 'GPU-RESOLUTION', 'GPU-FREQUENCY', 'GPU-COLOR',
                        'SSD-NAME', 'SSD-VERSION', 'SSD-TYPE', 'SSD-SERIAL', 'SSD-SIZE',
                        'HDD-NAME', 'HDD-VERSION', 'HDD-TYPE', 'HDD-SERIAL', 'HDD-SIZE',
                        'USB-NAME', 'USB-VERSION', 'USB-TYPE', 'USB-SERIAL', 'USB-SIZE',
                        'ROM-TYPE', 'ROM-NAME', 'ROM-DRIVE', 'ROM-VERSION',
                        'DEV-NAME', 'DEV-BENCHMARK'
                    ];
                    for (var j = 0, jLen = list.length; j < jLen; j++) {
                        key = list[j];// получаем очередной ключ
                        list[j] = data[key] ? data[key] : '';
                    };
                    wsh.echo(list.join(app.val.csvDelim));
                } else {// если это не служебный параметр
                    value = shell.expandEnvironmentStrings(value);
                    if (-1 != value.indexOf(app.val.argDelim)) {// если есть разделитель
                        value = app.val.argWrap + value + app.val.argWrap;
                    };
                    items.push(value);
                };
            };
            command = items.join(app.val.argDelim);
            // вызываем командную строку
            try {// пробуем выполнить команду
                if (command) value = shell.run(command, app.val.runStyle, true);
                else value = app.val.defReturn;
            } catch (e) {// при возникновении ошибки
                value = app.val.defReturn;
            };
            // завершаем сценарий кодом
            wsh.quit(value);
        }
    });
})(WSH, env);
// запускаем инициализацию
env.init();