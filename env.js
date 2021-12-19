/* 1.3.9 определяет дополнительные переменные среды

cscript env.min.js [\\<context>] [<input>@<charset>] [<output>] [<option>...] ...

<context>   - В контексте какого компьютера получить переменные.
<input>     - Формат текстовых данных стандартного потока ввода.
    ini     - Ввести дополнительные переменные в ini формате.
    csv     - Ввести в csv формате (заглавное написание ожидает ещё и заголовок).
    tsv     - Ввести в tsv формате (заглавное написание ожидает ещё и заголовок).
<output>    - Формат текстовых данных стандартного потока вывода.
    ini     - Вывести дополнительные переменные в ini формате.
    csv     - Вывести в csv формате (заглавное написание добавляет заголовок).
    tsv     - Вывести в tsv формате (заглавное написание добавляет заголовок).
<charset>   - Кодировка текста стандартного потока ввода.
<option>    - Дополнительные опции (может быть несколько, порядок не важен).
    silent  - Последующие команды выполнить без отображения.
    nowait  - Последующие команды выполнить без ожидания.
    debug   - Ввести в стандартный поток ошибок отладочную информацию.

*/

var env = new App({
    driveMinSize: 26 * 1024 * 1024 * 1024,              // минимальный общий объём диска для резервных копий в байтах
    runStyle: 1,                                        // стиль отображения запущенных программ по умолчанию
    defReturn: 0,                                       // значение возвращаемое по умолчанию
    argWrap: '"',                                       // обрамление аргументов
    argDelim: " ",                                      // разделитель значений агрументов
    linDelim: "\r\n",                                   // разделитель строк значений
    keyDelim: "\\",                                     // разделитель ключевых значений
    chrDelim: "@",                                      // разделитель кодировки от значений
    getDelim: "+",                                      // разделитель который нужно заменить
    setDelim: "#",                                      // разделитель на который нужно заменить
    iniDelim: "=",                                      // разделитель значений для файла выгрузки ini
    csvDelim: ";",                                      // разделитель значений для файла выгрузки csv
    tsvDelim: "\t",                                     // разделитель значений для файла выгрузки tsv
    envType: "Process"                                  // тип изменяемого переменного окружения
});

// подключаем зависимые свойства приложения
(function (wsh, app, undefined) {
    app.lib.extend(app, {
        fun: {// зависимые функции частного назначения

            /**
             * Преобразовывает строку с датой из WQL ответа в объект даты.
             * @param {string} wql - Строка с датой из WQL ответа.
             * @param {number} [offset] - Смещение по времени в минутах.
             * @returns {date} Преобразованная дата.
             */

            wql2date: function (wql, offset) {
                return new Date(wql ? Date.UTC(
                    1 * wql.substr(0, 4),
                    1 * wql.substr(4, 2) - 1,
                    1 * wql.substr(6, 2),
                    1 * wql.substr(8, 2),
                    1 * wql.substr(10, 2) - 1 * wql.substr(21, 4) + (offset || 0),
                    1 * wql.substr(12, 2),
                    1 * wql.substr(14, 3)
                ) : 0);
            },

            /**
             * Преобразовывает номер недели в году в объект даты по стандарту ISO-8601.
             * @param {number} week - Номер недели в году.
             * @param {number} [year] - Расчётный год.
             * @returns {date} Дата четверга заданной недели.
             */

            getDateOfWeek: function getDateOfWeek(week, year) {
                var day, now, date;

                now = new Date();// текущее время
                week = 1 * week || 1;// по умолчанию первая неделя
                year = 1 * year || now.getFullYear();// текущий год
                day = new Date(year, 0, 4).getDay();// день для 4 января
                day = (6 + day) % 7;// начало недели с понедельника
                date = new Date(year, 0, 0 - day + 7 * week);
                // возвращаем результат
                return date;
            },

            /**
             * Преобразовывает бинарные данные в ключ продукта.
             * @param {binary} bin - Бинарные данные ключа продукта.
             * @returns {string} Строковое значение ключа продукта.
             */

            bin2key: function (bin) {
                var isWin8, list, cur, last, part, pref = "N",
                    chars = "BCDFGHJKMPQRTVWXY2346789",
                    key = "", offset = 52;

                try {// пробуем преобразовать в массив
                    list = bin.toArray();
                } catch (e) { list = []; };
                if (list.length) {// если есть данные
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
                    key = [// форматируем ключ
                        key.substr(0, 5),
                        key.substr(5, 5),
                        key.substr(10, 5),
                        key.substr(15, 5),
                        key.substr(20, 5)
                    ].join("-");
                };
                // возвращаем результат
                return key;
            },

            /**
             * Преобразовывает бинарные данные в идентификатор безопасности.
             * @param {binary} bin - Бинарные данные идентификатора безопасности.
             * @returns {string} Строковое значение идентификатора безопасности.
             */

            bin2sid: function (bin) {
                var list, revision, authority, subAuthority, count,
                    offset, size, id = "S", delim = "-", sid = "";

                try {// пробуем преобразовать в массив
                    list = bin.toArray();
                } catch (e) { list = []; };
                if (list.length) {// если есть данные
                    // 0 байт - номер редакции
                    revision = list[0] & 255;
                    sid += id + delim + revision;
                    // 1 байт - колличество дополнительных блоков
                    count = list[1] & 255;
                    // 2 - 7 байты - 48 битный основной блок [Big-Endian]
                    authority = 0;// сбрасываем значение
                    for (var i = 2; i <= 7; i++) {// пробигаемся по байтам
                        authority += (list[i] & 255) * (1 << 8 * (5 - (i - 2)));
                    };
                    sid += delim + authority;
                    // 32 битные дополнительные блоки [Little-Endian]
                    size = 4; // 4 байта для каждого дополнительного блока
                    offset = 8;// задаём начальное смещение
                    for (var i = 0; i < count; i++) {// пробигаемся по блокам
                        subAuthority = 0;// сбрасываем значение
                        for (var j = 0; j < size; j++) {// пробигаемся по байтам
                            subAuthority += (list[offset + j] & 255) * (1 << 8 * j);
                        };
                        sid += delim + subAuthority;
                        offset += size;
                    };
                };
                // возвращаем результат
                return sid;
            },

            /**
             * Преобразовывает бинарные данные в строку текста.
             * @param {binary} bin - Бинарные данные для преобразования.
             * @returns {string} Строковое значение после преобразования.
             */

            bin2str: function (bin) {
                var list, index, value = "";

                try {// пробуем преобразовать в массив
                    list = bin.toArray();
                } catch (e) { list = []; };
                // обрабатываем список значений
                for (var i = 0, iLen = list.length; i < iLen; i++) {
                    index = list[i];// получаем очередное значение
                    if (index) value += String.fromCharCode(index);
                };
                // возвращаем результат
                return value;
            },

            /**
             * Преобразовывает число, количество бит или байт, в строку с размерностью.
             * @param {number} info - Колличество информации в битах или байтах.
             * @param {number} [decim] - Количество знаков после запятой.
             * @param {number} [base=1024] - База для преобразования.
             * @returns {string} Строковое значение с первой буквой степени.
             */

            info2str: function (info, decim, base) {
                var factor, value, prefix = "КМГТПЭЗЙ";

                if (!base || base < 2) base = 1024;
                if (!decim || decim < 0) decim = 0;
                factor = Math.pow(10, decim);
                for (var i = -1; info >= base; i++) info = info / base;
                value = Math.ceil(info * factor) / factor;
                value = app.lib.num2str(value, i > -1 ? decim : 0, ",", "");
                value += " " + prefix.charAt(i);
                return value;
            },

            /**
             * Очищает текст от лишних данных.
             * @param {string} value - Текс для очистки от лишних данных.
             * @returns {string} Очищенный текст.
             */

            clear: function (value) {
                value = value ? "" + value : "";
                // очищаем по полному содержимому
                if ("INVALID" == value) value = "";
                if ("To be filled by O.E.M." == value) value = "";
                if ("System Product Name" == value) value = "";
                if ("System Serial Number" == value) value = "";
                if ("System manufacturer" == value) value = "";
                if ("Default string" == value) value = "";
                if ("empty" == value) value = "";
                if ("None" == value) value = "";
                // очищаем по переданному содержимому
                for (var i = 1, iLen = arguments.length; i < iLen; i++) {
                    value = value.replace(arguments[i], "");
                };
                // очищаем по регулярным выражениям
                return value
                    .replace(/\(R\)/gi, "")                     // символ патента
                    .replace(/\(Registered Trademark\)/gi, "")  // тарговая марка
                    .replace(/\(Microsoft Corporation\)/gi, "") // тарговая марка
                    .replace(/\(Корпорация Майкрософт\)/gi, "") // тарговая марка
                    .replace(/\(Майкрософт\)/gi, "")            // тарговая марка
                    .replace(/\(TM\)/gi, "")                    // символ тарговой марки
                    .replace(/^[/'"]|[/"']$/g, "")              // лишние символы по бокам
                    .replace(/\r\n|\n|\t/g, " ")                // переводы строк и табуляции
                    .replace(/^\s+|\s+$/g, "")                  // пробельные символы в начале и в конце
                    .replace(/\.+$/, "")                        // точки в конце строки
                    .replace(/\s(?=\s)/gi, "")                  // лишнии пробельные символы
                    ;
            },

            /**
             * Исправляет текст для WQL запроса.
             * @param {string} value - Текст для исправления.
             * @returns {string} Исправленный текст.
             */

            repair: function (value) {
                value = "'" + (value ? value : "") + "'";
                return value.replace(/\\/g, "\\\\");
            },

            /**
             * Выводит отладочную информацию на экран.
             * @param {string} value - Служебная информация.
             * @returns {string} Служебная информация.
             */

            debug: (function () {
                var list, before, time = {}, count = -1;

                return function (value) {
                    // выводим отладочную информацию
                    if (time.first) {// если включена отладка
                        // формируем первую часть
                        list = [app.lib.strPad(count, 3, "0", "left")];
                        list.push("|");// разделитель блоков
                        list.push(app.lib.strPad(app.lib.num2str((time.now.valueOf() - time.first.valueOf()) / 1000, 3, ".", ""), 7, "0", "left"));
                        // смешвем время в текущую итерацию
                        time.last = time.now;// сохраняем время вызова
                        time.now = new Date();// сохраняем текущее время
                        // формируем вторую часть
                        list.push("+" + app.lib.strPad(app.lib.num2str((time.now.valueOf() - time.last.valueOf()) / 1000, 3, ".", ""), 7, "0", "left"));
                        list.push("|");// разделитель блоков
                        list.push(before);// отладочное сообщение
                        // выводим информацию на экран
                        try {// пробуем отправить данные
                            wsh.stdErr.writeLine(list.join(" "));
                        } catch (e) { };// игнорируем исключения
                    } else time.now = new Date();
                    // сохраняем текущее состояние
                    if (!count && before) time.first = time.now;
                    before = value;// сохраняем сообщение
                    count++;// увеличиваем счётчик
                    // возвращаем переданное значение
                    return value;
                };
            })()
        },
        init: function () {// функция инициализации приложения
            var shell, time, key, value, list, locator, cim, wmi, ldap, storage, registry,
                length, mode, method, param, unit, item, items, command, id, drive,
                score, total, offset, index, columns, delim, isEmpty, isAddType,
                host = "", domain = "", user = {}, data = {}, config = {},
                benchmark = 0;

            time = new Date();
            shell = new ActiveXObject("WScript.Shell");
            locator = new ActiveXObject("wbemScripting.Swbemlocator");
            locator.security_.impersonationLevel = 3;// Impersonate
            // получаем параметры конфигурации
            length = wsh.arguments.length;// получаем длину
            for (index = 0; index < length; index++) {
                value = wsh.arguments.item(index);// получаем очередное значение
                // контекст выполнения
                key = "context";// ключ проверяемого параметра
                if (!(key in config)) {// если нет в конфигурации
                    list = value.split(app.val.keyDelim);// вспомогательный список
                    if (3 == list.length) {// если пройдена основная проверка
                        if (// множественное условие
                            !list[0] && !list[1]
                        ) {// если пройдена дополнительная проверка
                            config[key] = list[2];// задаём значение
                            continue;// переходим к следующему параметру
                        };
                    };
                };
                // импорт данных и кодировка
                key = "input";// ключ проверяемого параметра
                if (!(key in config)) {// если нет в конфигурации
                    list = value.split(app.val.chrDelim);// вспомогательный список
                    if (2 == list.length) {// если пройдена основная проверка
                        if (// множественное условие
                            app.lib.hasValue(["ini", "csv", "tsv", "CSV", "TSV"], list[0], true) && list[1]
                        ) {// если пройдена дополнительная проверка
                            config[key] = list[0];// задаём значение
                            config.charset = list[1];// задаём значение
                            continue;// переходим к следующему параметру
                        };
                    };
                };
                // экспорт данных
                key = "output";// ключ проверяемого параметра
                if (!(key in config)) {// если нет в конфигурации
                    list = value.split(app.val.chrDelim);// вспомогательный список
                    if (1 == list.length) {// если пройдена основная проверка
                        if (// множественное условие
                            app.lib.hasValue(["ini", "csv", "tsv", "CSV", "TSV"], list[0], true)
                        ) {// если пройдена дополнительная проверка
                            config[key] = list[0];// задаём значение
                            continue;// переходим к следующему параметру
                        };
                    };
                };
                // тихий режим
                key = "silent";// ключ проверяемого параметра
                if (!(key in config)) {// если нет в конфигурации
                    if (!app.lib.compare(key, value, true)) {// если пройдена основная проверка
                        config[key] = true;// задаём значение
                        continue;// переходим к следующему параметру
                    };
                };
                // без ожидания
                key = "nowait";// ключ проверяемого параметра
                if (!(key in config)) {// если нет в конфигурации
                    if (!app.lib.compare(key, value, true)) {// если пройдена основная проверка
                        config[key] = true;// задаём значение
                        continue;// переходим к следующему параметру
                    };
                };
                // режим отладки
                key = "debug";// ключ проверяемого параметра
                if (!(key in config)) {// если нет в конфигурации
                    if (!app.lib.compare(key, value, true)) {// если пройдена основная проверка
                        config[key] = true;// задаём значение
                        continue;// переходим к следующему параметру
                    };
                };
                // если закончились параметры конфигурации
                break;// остававливаем получние параметров
            };
            // вносим поправки для конфигурации
            offset = index;// запоминаем смещение по параметрам
            if (!("context" in config)) config.context = ".";
            if ("auto" == config.charset) config.charset = "windows-1251";
            // создаём служебные объекты
            app.fun.debug(config.debug);// если это необходимо включаем отладочный режим
            if (config.context) {// если есть контекст выполнения
                app.fun.debug("Connect and create objects");
                for (index = 1; index; index++) {
                    try {// пробуем подключиться к компьютеру используя флаг wbemConnectFlagUseMaxWait
                        switch (index) {// последовательно создаём объекты
                            case 1: cim = locator.connectServer(config.context, "root\\CIMV2", null, null, null, null, 0x80); break;
                            case 2: wmi = locator.connectServer(config.context, "root\\WMI", null, null, null, null, 0x80); break;
                            case 3: ldap = locator.connectServer(".", "root\\directory\\LDAP", null, null, null, null, 0x80); break;
                            case 4: storage = locator.connectServer(config.context, "root\\Microsoft\\Windows\\Storage", null, null, null, null, 0x80); break;
                            case 5: registry = locator.connectServer(config.context, "root\\default", null, null, null, null, 0x80).get("stdRegProv"); break;
                            default: index = -1;// завершаем создание
                        };
                    } catch (e) {// при возникновении ошибки
                        switch (index) {// последовательно сбрасываем объекты
                            case 1: cim = null; index = -1; break;// завершаем создание
                            case 2: wmi = null; break;
                            case 3: ldap = null; break;
                            case 4: storage = null; break;
                            case 5: registry = null; break;
                        };
                    };
                };
            };
            // получаем необходимые данные
            if (cim) {// если удалось получить доступ к объекту
                // вычисляем ключ операционной системы
                if (registry) {// если удалось получить доступ к объекту
                    method = registry.methods_.item("getBinaryValue");
                    param = method.inParameters.spawnInstance_();
                    param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
                    param.sSubKeyName = "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion";
                    param.sValueName = app.fun.debug("DigitalProductId");
                    item = registry.execMethod_(method.name, param);
                    if (!item.returnValue) {// если удалось прочитать значение
                        value = app.fun.bin2key(item.uValue);// преобразовываем значение ключа
                        if (value = app.fun.clear(value)) data["SYS-KEY"] = value;
                    };
                };
                // вычисляем характеристики операционной системы
                id = "";// сбрасываем идентификатор элимента
                response = cim.execQuery(app.fun.debug(
                    "SELECT *" +
                    " FROM Win32_OperatingSystem" +
                    " WHERE primary = TRUE"
                ));
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    if (value = item.systemDrive) drive = value;
                    if (value = item.localDateTime) time = app.fun.wql2date(value);
                    // характеристики
                    if (value = app.fun.clear(item.caption, "Майкрософт", "Microsoft", "Edition", "x64", ",")) data["SYS-NAME"] = value;
                    if (value = app.fun.clear(item.version)) data["SYS-VERSION"] = value;
                    if (value = item.localDateTime) data["SYS-TIME"] = app.lib.date2str(app.fun.wql2date(value), "d.m.Y H:i:s");
                    if (value = item.localDateTime) data["SYS-TIME-DATE"] = app.lib.date2str(app.fun.wql2date(value), "d.m.Y");
                    if (value = app.fun.clear(item.systemDrive)) data["SYS-DRIVE"] = value;
                    if (value = item.installDate) data["SYS-INSTALL"] = app.lib.date2str(app.fun.wql2date(value), "d.m.Y H:i:s");
                    if (value = item.installDate) data["SYS-INSTALL-DATE"] = app.lib.date2str(app.fun.wql2date(value), "d.m.Y");
                    if (value = item.lastBootUpTime) data["SYS-RESET"] = app.lib.date2str(app.fun.wql2date(value), "d.m.Y H:i:s");
                    if (value = item.lastBootUpTime) data["SYS-RESET-DATE"] = app.lib.date2str(app.fun.wql2date(value), "d.m.Y");
                    if (value = app.fun.clear(item.serialNumber)) data["SYS-SERIAL"] = value;
                    if (value = app.fun.clear(item.description)) data["SYS-DESCRIPTION"] = value;
                    data["SYS-ARCHITECTURE"] = item.osArchitecture && !item.osArchitecture.indexOf("64") ? "x64" : "x86";
                    // останавливаемся на первом элименте
                    break;
                };
                // вычисляем характеристики материнской платы
                id = "";// сбрасываем идентификатор элимента
                response = cim.execQuery(app.fun.debug(
                    "SELECT manufacturer, product, serialNumber" +
                    " FROM Win32_BaseBoard" +
                    " WHERE hostingBoard = TRUE"
                ));
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    // характеристики
                    if (value = app.fun.clear(item.product)) data["PCB-NAME"] = value;
                    if (value) if (value = app.fun.clear(item.manufacturer, "Inc.").replace("Hewlett-Packard", "HP")) data["PCB-NAME"] = value.split(" ")[0] + " " + app.fun.clear(item.product);
                    if (value = app.fun.clear(item.serialNumber)) data["PCB-SERIAL"] = value;
                    // останавливаемся на первом элименте
                    break;
                };
                // вычисляем характеристики basic input/output system
                id = "";// сбрасываем идентификатор элимента
                response = cim.execQuery(app.fun.debug(
                    "SELECT releaseDate, manufacturer, smBIOSBIOSVersion, serialNumber" +
                    " FROM Win32_BIOS" +
                    " WHERE primaryBIOS = TRUE"
                ));
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    // характеристики
                    if (value = app.fun.clear(item.releaseDate)) data["PCB-BIOS-RELEASE"] = app.lib.date2str(app.fun.wql2date(value, time.getTimezoneOffset()), "d.m.Y H:i:s");
                    if (value = app.fun.clear(item.releaseDate)) data["PCB-BIOS-RELEASE-DATE"] = app.lib.date2str(app.fun.wql2date(value, time.getTimezoneOffset()), "d.m.Y");
                    if (value = app.fun.clear(item.manufacturer, "Inc.")) data["PCB-BIOS-MANUFACTURE"] = value;
                    if (value = app.fun.clear(item.smBIOSBIOSVersion)) data["PCB-BIOS-VERSION"] = value;
                    if (value = app.fun.clear(item.serialNumber)) data["PCB-BIOS-SERIAL"] = value;
                    // останавливаемся на первом элименте
                    break;
                };
                // вычисляем характеристики сетевого соединения
                id = "";// сбрасываем идентификатор элимента
                response = cim.execQuery(app.fun.debug(
                    "SELECT *" +
                    " FROM Win32_NetworkAdapterConfiguration" +
                    " WHERE ipEnabled = TRUE" +
                    " AND fullDNSRegistrationEnabled = TRUE"
                ));
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    if (item.serviceName && -1 != item.serviceName.indexOf("vpn")) continue;
                    if (item.serviceName && -1 != item.serviceName.indexOf("loop")) continue;
                    if (item.serviceName && -1 != item.serviceName.indexOf("VBox")) continue;
                    if (value = item.interfaceIndex) id = value;
                    // основной адрес 
                    if (null != item.ipAddress) {// если есть список ip адресов
                        list = item.ipAddress.toArray();// получаем очередной список
                        for (var i = 0, iLen = list.length; i < iLen; i++) {
                            value = app.fun.clear(list[i]);// получаем очередное значение
                            if (value && -1 != value.indexOf(".") && !data["NET-IP-V4"]) data["NET-IP-V4"] = value;
                            if (value && -1 == value.indexOf(".") && !data["NET-IP-V6"]) data["NET-IP-V6"] = value;
                        };
                    };
                    // основной шлюз
                    if (null != item.defaultIPGateway) {// если есть список ip адресов
                        list = item.defaultIPGateway.toArray();// получаем очередной список
                        for (var i = 0, iLen = list.length; i < iLen; i++) {
                            value = app.fun.clear(list[i]);// получаем очередное значение
                            if (value && -1 != value.indexOf(".") && !data["NET-GATEWAY-V4"]) data["NET-GATEWAY-V4"] = value;
                            if (value && -1 == value.indexOf(".") && !data["NET-GATEWAY-V6"]) data["NET-GATEWAY-V6"] = value;
                        };
                    };
                    // основной dns
                    if (null != item.dnsServerSearchOrder) {// если есть список ip адресов
                        list = item.dnsServerSearchOrder.toArray();// получаем очередной список
                        for (var i = 0, iLen = list.length; i < iLen; i++) {
                            value = app.fun.clear(list[i]);// получаем очередное значение
                            if (value && -1 != value.indexOf(".") && !data["NET-DNS-V4"]) data["NET-DNS-V4"] = value;
                            if (value && -1 == value.indexOf(".") && !data["NET-DNS-V6"]) data["NET-DNS-V6"] = value;
                        };
                    };
                    // основная маска
                    if (null != item.ipSubnet) {// если есть список ip адресов
                        list = item.ipSubnet.toArray();// получаем очередной список
                        for (var i = 0, iLen = list.length; i < iLen; i++) {
                            value = app.fun.clear(list[i]);// получаем очередное значение
                            if (value && -1 != value.indexOf(".") && !data["NET-SUBNET-V4"]) data["NET-SUBNET-V4"] = value;
                            if (value && -1 == value.indexOf(".") && !data["NET-SUBNET-V6"]) data["NET-SUBNET-V6"] = value;
                        };
                    };
                    // характеристики
                    if (value = app.fun.clear(item.dhcpServer)) data["NET-DHCP-V4"] = value;
                    if (value = app.fun.clear(item.description, "Сетевой адаптер", "Адаптер", "для виртуальной сети", "Сетевая карта", "Контроллер", "NIC (NDIS 6.20)", "- Минипорт планировщика пакетов", "Family Controller", "Adapter", "Virtual Miniport", "for Windows", "x64").replace(/#\d+$/g, "")) data["NET-NAME"] = value;
                    if (value = app.fun.clear(item.macAddress)) data["NET-MAC"] = value;
                    // останавливаемся на первом элименте
                    break;
                };
                // вычисляем характеристики сетевого адаптера
                if (id) {// если есть идентификатор для запроса
                    response = cim.execQuery(app.fun.debug(
                        "SELECT speed, timeOfLastReset" +
                        " FROM Win32_NetworkAdapter" +
                        " WHERE netEnabled = TRUE" +
                        " AND interfaceIndex = " + app.fun.repair(id)
                    ));
                    items = new Enumerator(response);
                    while (!items.atEnd()) {// пока не достигнут конец
                        item = items.item();// получаем очередной элимент коллекции
                        items.moveNext();// переходим к следующему элименту
                        // характеристики
                        if (value = item.speed) data["NET-SPEED"] = app.fun.info2str(value, 0, 1000) + "бит/с";
                        if (value = item.speed) data["NET-SPEED-VAL"] = value;
                        if (value = item.timeOfLastReset) data["NET-RESET"] = app.lib.date2str(app.fun.wql2date(value), "d.m.Y H:i:s");
                        if (value = item.timeOfLastReset) data["NET-RESET-DATE"] = app.lib.date2str(app.fun.wql2date(value), "d.m.Y");
                        // останавливаемся на первом элименте
                        break;
                    };
                };
                // вычисляем дополнительные характеристики
                response = cim.execQuery(app.fun.debug(
                    "SELECT *" +
                    " FROM Win32_ComputerSystem"
                ));
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    if (value = item.dnsHostName) host = value;
                    if (value = item.name) if (!host) host = value.toLowerCase();
                    if (item.domain != item.workgroup) domain = item.domain;
                    // формируем идентификатор пользователя
                    if (value = item.userName) user.domain = value.split(app.val.keyDelim)[0];
                    if (value = item.userName) user.login = value.split(app.val.keyDelim)[1];
                    if (value = item.userName) user.account = value;
                    // характеристики
                    if (value = app.fun.clear(host)) data["NET-HOST"] = value;
                    if (value = app.fun.clear(item.domain)) data["NET-DOMAIN"] = value;
                    if (value = app.fun.clear(item.model)) data["DEV-NAME"] = value;
                    if (value) if (value = app.fun.clear(item.manufacturer, "Inc.", "Hewlett-Packard")) data["DEV-NAME"] = value.split(" ")[0] + " " + app.fun.clear(item.model);
                    // останавливаемся на первом элименте
                    break;
                };
                // для поддержки старых операционных систем
                if (!user.account && registry) {// если нужно выполнить
                    list = [];// сбрасываем список значений
                    // вычисляем имя пользователя поумолчанию
                    method = registry.methods_.item("getStringValue");
                    param = method.inParameters.spawnInstance_();
                    param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
                    param.sSubKeyName = "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon";
                    param.sValueName = app.fun.debug("DefaultDomainName");
                    item = registry.execMethod_(method.name, param);
                    if (!item.returnValue && item.sValue) list.push(item.sValue);
                    // вычисляем домен пользователя поумолчанию
                    method = registry.methods_.item("getStringValue");
                    param = method.inParameters.spawnInstance_();
                    param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
                    param.sSubKeyName = "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon";
                    param.sValueName = app.fun.debug("DefaultUserName");
                    item = registry.execMethod_(method.name, param);
                    if (!item.returnValue && item.sValue) list.push(item.sValue);
                    // формируем идентификатор пользователя
                    if (2 == list.length) user.domain = list[0];
                    if (2 == list.length) user.login = list[1];
                    if (2 == list.length) user.account = list.join(app.val.keyDelim);
                };
                // вычисляем характеристики из локального профиля
                if (!user.account) {// если идентификатор пользователя неопределён
                    unit = null;// сбрасываем значение
                    response = cim.execQuery(app.fun.debug(
                        "SELECT lastUseTime, localPath, loaded, sid" +
                        " FROM Win32_UserProfile" +
                        " WHERE special = FALSE"
                    ));
                    items = new Enumerator(response);
                    while (!items.atEnd()) {// пока не достигнут конец
                        item = items.item();// получаем очередной элимент коллекции
                        items.moveNext();// переходим к следующему элименту
                        // производим сравнение элиментов
                        value = unit ? 0 : 1;// сбрасваем значение для сравнения
                        if (!value) value = item.loaded && !unit.loaded ? 1 : value;
                        if (!value) value = app.lib.compare(app.fun.wql2date(item.lastUseTime), app.fun.wql2date(unit.lastUseTime));
                        // запоминаем более подходящий элимент
                        if (value > 0) unit = item;
                    };
                    if (item = unit) {// если есть подходящий элимент
                        // формируем идентификатор пользователя
                        user.profile = item.localPath;
                        if (value = item.sid) user.sid = value;
                    };
                };
                // вычисляем характеристики из sid
                if (!user.account && user.sid) {// если нужно выполнить
                    list = [];// сбрасываем список значений
                    // получаем вспомогательный объект
                    try {// пробуем получить данные
                        item = cim.get('Win32_SID.SID="' + user.sid + '"');
                    } catch (e) {// при возникновении ошибки
                        item = null;
                    };
                    // вычисляем имя и домен пользователя
                    if (value = item.referencedDomainName) list.push(value);
                    if (value = item.accountName) list.push(value);
                    // формируем идентификатор пользователя
                    if (2 == list.length) user.domain = list[0];
                    if (2 == list.length) user.login = list[1];
                    if (2 == list.length) user.account = list.join(app.val.keyDelim);
                };
                // вычисляем характеристики локального пользователя
                if (user.account && app.lib.hasValue([".", host], user.domain, false)) {// если нужно выполнить
                    response = cim.execQuery(app.fun.debug(
                        "SELECT domain, name, fullName, sid" +
                        " FROM Win32_UserAccount" +
                        " WHERE name = " + app.fun.repair(user.login) +
                        " AND domain = " + app.fun.repair(user.domain)
                    ));
                    items = new Enumerator(response);
                    while (!items.atEnd()) {// пока не достигнут конец
                        item = items.item();// получаем очередной элимент коллекции
                        items.moveNext();// переходим к следующему элименту
                        list = [];// сбрасываем список значений
                        // характеристики
                        user.name = item.fullName;
                        if (value = item.sid) user.sid = value;
                        // вычисляем имя и домен пользователя
                        if (value = item.domain) list.push(value);
                        if (value = item.name) list.push(value);
                        // формируем идентификатор пользователя
                        if (2 == list.length) user.domain = list[0];
                        if (2 == list.length) user.login = list[1];
                        if (2 == list.length) user.account = list.join(app.val.keyDelim);
                        // останавливаемся на первом элименте
                        break;
                    };
                };
                // вычисляем характеристики доменного пользователя
                if (user.account && ldap && !app.lib.hasValue([".", host], user.domain, false)) {// если нужно выполнить
                    list = [// список запрашиваемых аттрибутов
                        "DS_co", "DS_c", "DS_company", "DS_displayName", "DS_department", "DS_info",
                        "DS_homeDirectory", "DS_l", "DS_mail", "DS_mobile", "DS_objectSid",
                        "DS_telephoneNumber", "DS_title", "DS_distinguishedName"
                    ];
                    response = ldap.execQuery(app.fun.debug(
                        "SELECT " + list.join(", ") +
                        " FROM DS_user" +
                        " WHERE DS_sAMAccountName = " + app.fun.repair(user.login)
                    ));
                    items = new Enumerator(response);
                    while (!items.atEnd()) {// пока не достигнут конец
                        item = items.item();// получаем очередной элимент коллекции
                        items.moveNext();// переходим к следующему элименту
                        // характеристики
                        user.name = item.DS_displayName;
                        user.home = item.DS_homeDirectory;
                        if (unit = item.DS_objectSid) if (value = app.fun.bin2sid(unit.value)) user.sid = value;
                        if (value = app.fun.clear(item.DS_co)) data["USR-COUNTRY"] = value;
                        if (value = app.fun.clear(item.DS_c)) data["USR-COUNTRY-ID"] = value;
                        if (value = app.fun.clear(item.DS_company, '"')) data["USR-COMPANY"] = value;
                        if (value = app.fun.clear(item.DS_department, '"')) data["USR-DEPARTMENT"] = value;
                        if (value = app.fun.clear(item.DS_distinguishedName)) data["USR-ACCOUNT-DN"] = value;
                        if (value = app.fun.clear(item.DS_l)) data["USR-CITY"] = value;
                        if (value = app.fun.clear(item.DS_mail)) data["USR-EMAIL"] = value;
                        if (value = app.fun.clear(item.DS_mobile)) data["USR-MOBILE"] = value;
                        if (value = app.fun.clear(item.DS_telephoneNumber)) data["USR-PHONE"] = value;
                        if (value = app.fun.clear(item.DS_title, '"')) data["USR-POSITION"] = value;
                        if (value = app.fun.clear(item.DS_info, '"')) data["USR-INFO"] = value;
                        // останавливаемся на первом элименте
                        break;
                    };
                };
                // вычисляем характеристики из сетевого профиля
                if (user.account && !("home" in user)) {// если нужно выполнить
                    response = cim.execQuery(app.fun.debug(
                        "SELECT homeDirectory" +
                        " FROM Win32_NetworkLoginProfile" +
                        " WHERE name = " + app.fun.repair(user.account)
                    ));
                    items = new Enumerator(response);
                    while (!items.atEnd()) {// пока не достигнут конец
                        item = items.item();// получаем очередной элимент коллекции
                        items.moveNext();// переходим к следующему элименту
                        // формируем идентификатор пользователя
                        user.home = item.homeDirectory;
                        // останавливаемся на первом элименте
                        break;
                    };
                };
                // вычисляем характеристики из локального профиля
                if (user.sid && !("profile" in user)) {// если нужно выполнить
                    response = cim.execQuery(app.fun.debug(
                        "SELECT localPath" +
                        " FROM Win32_UserProfile" +
                        " WHERE sid = " + app.fun.repair(user.sid)
                    ));
                    items = new Enumerator(response);
                    while (!items.atEnd()) {// пока не достигнут конец
                        item = items.item();// получаем очередной элимент коллекции
                        items.moveNext();// переходим к следующему элименту
                        // формируем идентификатор пользователя
                        user.profile = item.localPath;
                        // останавливаемся на первом элименте
                        break;
                    };
                };
                // заполняем сводную информацию по пользователю
                if (value = app.fun.clear(user.sid)) data["USR-SID"] = value;
                if (value = app.fun.clear(user.account)) data["USR-ACCOUNT"] = value;
                if (value = app.fun.clear(user.login)) data["USR-LOGIN"] = value;
                if (value = app.fun.clear(user.domain)) data["USR-DOMAIN"] = value;
                if (value = app.fun.clear(user.profile)) data["USR-PROFILE"] = value;
                if (value = app.fun.clear(user.home)) data["USR-HOME"] = value;
                if (value = app.fun.clear(user.name)) data["USR-NAME"] = value;
                if (value = app.fun.clear(user.name)) {// если получено значение
                    list = value.split(app.val.argDelim);// рабзиваем на фрагменты
                    for (var i = list.length - 1; i > -1; i--) {// пробигаемся по списку
                        value = app.fun.clear(list[i], /[\[\(,\.\)\]]/g);
                        isEmpty = value.length < 3;// считать ли это значение пустым
                        isEmpty = isEmpty || app.lib.hasValue(["von"], value, true);
                        if (isEmpty) list.splice(i, 1);
                        else list[i] = value;
                    };
                    if (value = list[0]) data["USR-NAME-FIRST"] = value;
                    if (value = list[1]) data["USR-NAME-SECOND"] = value;
                    if (value = list[2]) data["USR-NAME-THIRD"] = value;
                    if (value = list[3]) data["USR-NAME-FOURTH"] = value;
                };
                // вычисляем distinguished name компьютера в active directory 
                if (host && ldap && domain) {// если нужно выполнить
                    response = ldap.execQuery(app.fun.debug(
                        "SELECT DS_distinguishedName" +
                        " FROM DS_computer" +
                        " WHERE DS_cn = " + app.fun.repair(host)
                    ));
                    items = new Enumerator(response);
                    while (!items.atEnd()) {// пока не достигнут конец
                        item = items.item();// получаем очередной элимент коллекции
                        items.moveNext();// переходим к следующему элименту
                        // характеристики
                        if (value = app.fun.clear(item.DS_distinguishedName)) data["NET-HOST-DN"] = value;
                        // останавливаемся на первом элименте
                        break;
                    };
                };
                // вычисляем характеристики центрального процессора
                score = 0;// обнуляем текущую оценку
                id = "";// сбрасываем идентификатор элимента
                response = cim.execQuery(app.fun.debug(
                    "SELECT architecture, maxClockSpeed, name, revision, numberOfCores, socketDesignation" +
                    " FROM Win32_Processor" +
                    " WHERE role = 'CPU'"
                ));
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    // характеристики
                    if (0 == item.architecture) data["CPU-ARCHITECTURE"] = "x86";
                    else if (9 == item.architecture) data["CPU-ARCHITECTURE"] = "x64";
                    if (value = item.maxClockSpeed) data["CPU-SPEED"] = app.fun.info2str(value * 1000 * 1000, 2, 1000) + "Гц";
                    if (value = item.maxClockSpeed) data["CPU-SPEED-VAL"] = value * 1000 * 1000;
                    if (value = app.fun.clear(item.name, "CPU", "APU", "Процессор", "Processor", "with", "Radeon HD Graphics", "11th Gen")) data["CPU-NAME"] = value;
                    if (value = app.fun.clear(item.revision)) data["CPU-VERSION"] = value;
                    if (value = app.fun.clear(item.numberOfCores)) data["CPU-CORE"] = value;
                    if (value = app.fun.clear(item.socketDesignation, "SOCKET 0")) data["CPU-SOCKET"] = value;
                    // косвенно считаем производительность
                    if (value = item.maxClockSpeed) score += 2.26143 * Math.sqrt(value / 1000);
                    if (value = item.numberOfCores) score *= 1.02033 * Math.sqrt(value);
                    // останавливаемся на первом элименте
                    break;
                };
                if (score) benchmark = benchmark ? Math.min(benchmark, score) : score;
                // вычисляем характеристики кеша процессора
                id = "";// сбрасываем идентификатор элимента
                response = cim.execQuery(app.fun.debug(
                    "SELECT level, maxCacheSize" +
                    " FROM Win32_CacheMemory"
                ));
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    // характеристики
                    if (value = item.maxCacheSize) data["CPU-CACHE-L" + (item.level - 2)] = app.fun.info2str(value * 1024, 0) + "Б";
                };
                // вычисляем характеристики оперативной памяти
                score = 0;// обнуляем текущую оценку
                total = 0;// обнуляем значение для суммирования
                id = "";// сбрасываем идентификатор элимента
                response = cim.execQuery(app.fun.debug(
                    "SELECT capacity, speed" +
                    " FROM Win32_PhysicalMemory"
                ));
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    // характеристики
                    if (value = item.capacity) data["RAM-SIZE-VAL"] = total += 1 * value;
                    if (value = item.capacity) data["RAM-SIZE"] = app.fun.info2str(total, 0) + "Б";
                    if (value = item.speed) data["RAM-SPEED"] = value + " МГц";
                    if (value = item.speed) data["RAM-SPEED-VAL"] = value * 1000 * 1000;
                    // косвенно считаем производительность
                    if (value = total) score = 2.51143 * Math.sqrt(value / 1024 / 1024 / 1024);
                    if (value = item.speed) score *= 0.92245 * Math.sqrt(value / 1000);
                };
                if (score) benchmark = benchmark ? Math.min(benchmark, score) : score;
                // вычисляем характеристики графического процессора
                id = "";// сбрасываем идентификатор элимента
                response = cim.execQuery(app.fun.debug(
                    "SELECT adapterRam, name, driverVersion, currentHorizontalResolution, currentRefreshRate, currentBitsPerPixel, currentVerticalResolution" +
                    " FROM Win32_VideoController"
                ));
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    // характеристики
                    if (value = item.adapterRam) data["GPU-SIZE"] = app.fun.info2str(Math.abs(value), 0) + "Б";
                    if (value = item.adapterRam) data["GPU-SIZE-VAL"] = Math.abs(value);
                    if (value = app.fun.clear(item.name, "GPU", "Видеоустройство", "Family", "Chipset", "Series", "Graphics", "Adapter")) data["GPU-NAME"] = value;
                    if (value = app.fun.clear(item.driverVersion)) data["GPU-VERSION"] = value;
                    if (item.currentHorizontalResolution && item.currentVerticalResolution) data["GPU-RESOLUTION"] = item.currentHorizontalResolution + " x " + item.currentVerticalResolution;
                    if (value = item.currentHorizontalResolution) data["GPU-RESOLUTION-X"] = value;
                    if (value = item.currentVerticalResolution) data["GPU-RESOLUTION-Y"] = value;
                    if (value = item.currentRefreshRate) data["GPU-FREQUENCY"] = app.fun.info2str(value, 0, 1000) + "Гц";
                    if (value = item.currentRefreshRate) data["GPU-FREQUENCY-VAL"] = value;
                    if (value = item.currentBitsPerPixel) data["GPU-COLOR"] = app.fun.info2str(value, 0) + "бит" + app.lib.numDeclin(value, "", "", "а");
                    if (value = item.currentBitsPerPixel) data["GPU-COLOR-VAL"] = value;
                    // останавливаемся на первом элименте
                    break;
                };
                // вычисляем характеристики монитора
                if (wmi) {// если удалось получить доступ к объекту                    
                    // вычисляем общие характеристики монитора
                    id = "";// сбрасываем идентификатор элимента
                    response = wmi.execQuery(app.fun.debug(
                        "SELECT instanceName, serialNumberId, userFriendlyName, userFriendlyNameLength, weekOfManufacture, yearOfManufacture" +
                        " FROM WmiMonitorID" +
                        " WHERE active = TRUE"
                    ));
                    items = new Enumerator(response);
                    while (!items.atEnd()) {// пока не достигнут конец
                        item = items.item();// получаем очередной элимент коллекции
                        items.moveNext();// переходим к следующему элименту
                        if (!item.userFriendlyNameLength) continue;
                        if (value = item.instanceName) id = value;
                        // характеристики
                        if (value = app.fun.bin2str(item.userFriendlyName)) if (value = app.fun.clear(value, " 4K", " HDR")) data["MON-NAME"] = value;
                        if (value = app.fun.bin2str(item.serialNumberId)) if (value = app.fun.clear(value)) if ("0" != value) data["MON-SERIAL"] = value;
                        if (item.yearOfManufacture && item.weekOfManufacture) data["MON-RELEASE"] = app.lib.date2str(app.fun.getDateOfWeek(item.weekOfManufacture, item.yearOfManufacture), "d.m.Y H:i:s");
                        if (item.yearOfManufacture && item.weekOfManufacture) data["MON-RELEASE-DATE"] = app.lib.date2str(app.fun.getDateOfWeek(item.weekOfManufacture, item.yearOfManufacture), "d.m.Y");
                        // останавливаемся на первом элименте
                        break;
                    };
                    // вычисляем дополнительные характеристики монитора
                    if (id) {// если есть идентификатор для запроса
                        response = wmi.execQuery(app.fun.debug(
                            "SELECT maxHorizontalImageSize, maxVerticalImageSize" +
                            " FROM WmiMonitorBasicDisplayParams" +
                            " WHERE instanceName = " + app.fun.repair(id)
                        ));
                        items = new Enumerator(response);
                        while (!items.atEnd()) {// пока не достигнут конец
                            item = items.item();// получаем очередной элимент коллекции
                            items.moveNext();// переходим к следующему элименту
                            // характеристики
                            if (value = item.maxHorizontalImageSize) data["MON-SIZE-X"] = value;
                            if (value = item.maxVerticalImageSize) data["MON-SIZE-Y"] = value;
                            if (item.maxHorizontalImageSize && item.maxVerticalImageSize) {// если заданы значения
                                value = Math.sqrt(Math.pow(item.maxHorizontalImageSize, 2) + Math.pow(item.maxVerticalImageSize, 2));
                                value = Math.round(value / 2.54);// переводим в дюймы и округляем
                                data["MON-SIZE"] = item.maxHorizontalImageSize + " x " + item.maxVerticalImageSize + " см / " + value + " дюйм" + app.lib.numDeclin(value, "ов", "", "а");
                                data["MON-SIZE-Z"] = value;
                            };
                            // останавливаемся на первом элименте
                            break;
                        };
                    };
                };
                // вычисляем дисковую подсистему
                score = 0;// обнуляем текущую оценку
                id = "";// сбрасываем идентификатор элимента
                if (storage) {// если удалось получить доступ к объекту                    
                    response = storage.execQuery(app.fun.debug(
                        "SELECT model, firmwareVersion, mediaType, serialNumber, size" +
                        " FROM MSFT_PhysicalDisk"
                    ));
                } else {// для поддержки старых операционных систем
                    response = cim.execQuery(app.fun.debug(
                        "SELECT *" +
                        " FROM Win32_DiskDrive"
                    ));
                };
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    // определяем тип насителя
                    switch (item.mediaType) {// поддерживаемые типы
                        // для современных операционных систем
                        case 0: key = "USB"; break;
                        case 3: key = "HDD"; break;
                        case 4: key = "SSD"; break;
                        case 5: key = "SCM"; break;
                        // для старых операционных систем
                        case "Removable Media":
                            key = "USB";
                            break;
                        case "Fixed	hard disk media":
                        case "Fixed hard disk media":
                            if (item.model && -1 != item.model.indexOf("Solid")) key = "SSD";
                            else if (item.model && -1 != item.model.indexOf("SSD")) key = "SSD";
                            else if (item.model && !item.model.indexOf("ADATA")) key = "SSD";
                            else key = "HDD";
                            break;
                        // для неизвестных типов
                        default: key = "";
                    };
                    // пропускаем непонятные и повторяющийся типы насителя
                    if (item.model && -1 != item.model.indexOf("Raid")) continue;
                    if (!key || data[key + "-NAME"]) continue;
                    // характеристики
                    if (value = app.fun.clear(item.model, "ATA Device", "SCSI Disk Device", "USB Device", "SSD", "SATA")) data[key + "-NAME"] = value;
                    if (value = app.fun.clear(item.firmwareVersion || item.firmwareRevision)) data[key + "-VERSION"] = value;
                    if (value = app.fun.clear(item.serialNumber)) data[key + "-SERIAL"] = value;
                    if (value = item.size) data[key + "-SIZE"] = app.fun.info2str(value, 0) + "Б";
                    if (value = item.size) data[key + "-SIZE-VAL"] = value;
                    // косвенно считаем производительность
                    if (key) score = Math.max(score, "SDD" == key ? 15.51143 : 7.14577);
                };
                if (score) benchmark = benchmark ? Math.min(benchmark, score) : score;
                // вычисляем оптический привод
                id = "";// сбрасываем идентификатор элимента
                response = cim.execQuery(app.fun.debug(
                    "SELECT mediaType, caption, drive" +
                    " FROM Win32_CDROMDrive"
                ));
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    if (item.caption && -1 != item.caption.indexOf("Alcohol")) continue;
                    if (item.caption && -1 != item.caption.indexOf("Virtual")) continue;
                    if (item.caption && -1 != item.caption.indexOf("Виртуальный")) continue;
                    if (item.mediaType && "UNKNOWN" == item.mediaType) continue;
                    // определяем тип насителя
                    switch (item.mediaType) {// поддерживаемые типы
                        case "CD-ROM": data["ROM-TYPE"] = "CD"; break;
                        case "DVD-ROM": data["ROM-TYPE"] = "DVD"; break;
                        case "CD Writer": data["ROM-TYPE"] = "CD-RW"; break;
                        case "DVD Writer": data["ROM-TYPE"] = "DVD-RW"; break;
                    };
                    // характеристики
                    if (value = app.fun.clear(item.caption, "ATA Device", "SCSI CdRom Device")) data["ROM-NAME"] = value;
                    if (value = app.fun.clear(item.drive)) data["ROM-DRIVE"] = value;
                    // останавливаемся на первом элименте
                    break;
                };
                // вычисляем букву диска для резервных копий
                id = "";// сбрасываем идентификатор элимента
                response = cim.execQuery(app.fun.debug(
                    "SELECT caption, size" +
                    " FROM Win32_LogicalDisk" +
                    " WHERE driveType = 2 OR driveType = 3 OR driveType = 4"
                ));
                items = new Enumerator(response);
                while (!items.atEnd()) {// пока не достигнут конец
                    item = items.item();// получаем очередной элимент коллекции
                    items.moveNext();// переходим к следующему элименту
                    if (item.caption && -1 != item.caption.indexOf(drive) || data["BAK-DRIVE"]) continue;
                    // характеристики
                    if (value = app.fun.clear(item.caption)) if (item.size >= app.val.driveMinSize) data["BAK-DRIVE"] = value;
                };
                // ищем корневую папку программы eFarma
                id = "";// сбрасываем идентификатор элимента
                key = "DisplayIcon";// ключ для проверки
                list = [// список путей для проверки
                    "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\F3 TAIL",
                    "SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\F3 TAIL",
                    "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\еФарма",
                    "SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\еФарма"
                ];
                value = "";// сбрасываем значение переменной
                if (registry) {// если удалось получить доступ к объекту
                    method = registry.methods_.item("getStringValue");
                    for (var i = 0, iLen = list.length; i < iLen && !value; i++) {
                        param = method.inParameters.spawnInstance_();
                        param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
                        param.sSubKeyName = app.fun.debug(list[i]);
                        param.sValueName = key;
                        item = registry.execMethod_(method.name, param);
                        if (!item.returnValue && item.sValue) value = app.fun.clear(item.sValue);
                    };
                };
                if (value) {// если удалось получить значение
                    list = value.split(app.val.keyDelim);
                    list.pop();// удаляем последнай элимент
                    list.pop();// удаляем последнай элимент
                    // характеристики
                    id = list.join(app.val.keyDelim);
                    data["APP-EFARMA-DIR"] = id;
                };
                // ищем путь до клиента eFarma
                key = "\\Client\\ePlus.Client.exe";
                if (id) {// если есть идентификатор для списка
                    list = [// список путей для проверки
                        id
                    ];
                } else list = [];
                value = "";// сбрасываем значение для запроса
                for (var i = 0, iLen = list.length; i < iLen; i++) {
                    if (i) value += " OR ";// добавляем разделитель
                    value += "name = " + app.fun.repair(list[i] + key);
                };
                if (value) {// если удалось сформировать значение
                    response = cim.execQuery(app.fun.debug(
                        "SELECT name" +
                        " FROM CIM_DataFile" +
                        " WHERE " + value
                    ));
                    items = new Enumerator(response);
                    while (!items.atEnd()) {// пока не достигнут конец
                        item = items.item();// получаем очередной элимент коллекции
                        items.moveNext();// переходим к следующему элименту
                        for (var i = 0, iLen = list.length; i < iLen; i++) {
                            value = list[i] + key;// конечное значение
                            if (item.name && item.name.toLowerCase() == value.toLowerCase()) {
                                // характеристики
                                data["APP-EFARMA-CLIENT"] = value;
                                // останавливаемся на первом элименте
                                break;
                            };
                        };
                    };
                };
                // ищем путь до кассы eFarma
                key = "\\ARM\\ePlus.ARMCasherNew.exe";
                if (id) {// если есть идентификатор для списка
                    list = [// список путей для проверки
                        id
                    ];
                } else list = [];
                value = "";// сбрасываем значение для запроса
                for (var i = 0, iLen = list.length; i < iLen; i++) {
                    if (i) value += " OR ";// добавляем разделитель
                    value += "name = " + app.fun.repair(list[i] + key);
                };
                if (value) {// если удалось сформировать значение
                    response = cim.execQuery(app.fun.debug(
                        "SELECT name" +
                        " FROM CIM_DataFile" +
                        " WHERE " + value
                    ));
                    items = new Enumerator(response);
                    while (!items.atEnd()) {// пока не достигнут конец
                        item = items.item();// получаем очередной элимент коллекции
                        items.moveNext();// переходим к следующему элименту
                        for (var i = 0, iLen = list.length; i < iLen; i++) {
                            value = list[i] + key;// конечное значение
                            if (item.name && item.name.toLowerCase() == value.toLowerCase()) {
                                // характеристики
                                data["APP-EFARMA-CASHER"] = value;
                                // останавливаемся на первом элименте
                                break;
                            };
                        };
                    };
                };
                // ищем путь до сервера обновлений eFarma
                key = "\\UpdateServer\\ePlus.UpdateServer.exe";
                if (id) {// если есть идентификатор для списка
                    list = [// список путей для проверки
                        id
                    ];
                } else list = [];
                value = "";// сбрасываем значение для запроса
                for (var i = 0, iLen = list.length; i < iLen; i++) {
                    if (i) value += " OR ";// добавляем разделитель
                    value += "name = " + app.fun.repair(list[i] + key);
                };
                if (value) {// если удалось сформировать значение
                    response = cim.execQuery(app.fun.debug(
                        "SELECT name" +
                        " FROM CIM_DataFile" +
                        " WHERE " + value
                    ));
                    items = new Enumerator(response);
                    while (!items.atEnd()) {// пока не достигнут конец
                        item = items.item();// получаем очередной элимент коллекции
                        items.moveNext();// переходим к следующему элименту
                        for (var i = 0, iLen = list.length; i < iLen; i++) {
                            value = list[i] + key;// конечное значение
                            if (item.name && item.name.toLowerCase() == value.toLowerCase()) {
                                // характеристики
                                data["APP-EFARMA-UPDATER"] = value;
                                // останавливаемся на первом элименте
                                break;
                            };
                        };
                    };
                };
                // ищем путь до файла лицензии eFarma
                key = "lic";
                if (id) {// если есть идентификатор для списка
                    list = [// список путей для проверки
                        id + "\\UpdateServer\\",
                        id + "\\Client\\",
                        id + "\\ARM\\"
                    ];
                } else list = [];
                value = "";// сбрасываем значение для запроса
                for (var i = 0, iLen = list.length; i < iLen; i++) {
                    if (i) value += " OR ";// добавляем разделитель
                    value += "drive = " + app.fun.repair(app.lib.strim(list[i], "", ":", true, false)) + " ";
                    value += "AND path = " + app.fun.repair(app.lib.strim(list[i], ":", "", false, false)) + " ";
                    value += "AND extension = " + app.fun.repair(key);
                };
                if (value) {// если удалось сформировать значение
                    response = cim.execQuery(app.fun.debug(
                        "SELECT name, fileName" +
                        " FROM CIM_DataFile" +
                        " WHERE " + value
                    ));
                    items = new Enumerator(response);
                    while (!items.atEnd()) {// пока не достигнут конец
                        item = items.item();// получаем очередной элимент коллекции
                        items.moveNext();// переходим к следующему элименту
                        for (var i = 0, iLen = list.length; i < iLen; i++) {
                            value = list[i] + item.fileName + "." + key;// конечное значение
                            if (item.name && item.name.toLowerCase() == value.toLowerCase()) {
                                // характеристики
                                data["APP-EFARMA-LICENSE"] = value;
                                // останавливаемся на первом элименте
                                break;
                            };
                        };
                    };
                };
                // ищем корневую папку программы УЛУС
                id = "";// сбрасываем идентификатор элимента
                value = app.lib.date2str(time, "Y");
                key = "\\ULUS.exe";
                list = [// список путей для проверки
                    "C:\\SoftLink\\Ulus\\" + value,
                    "C:\\LO\\ULUS\\" + value,
                    "C:\\so\\Ulus\\" + value,
                    "C:\\ULUS\\" + value
                ];
                value = "";// сбрасываем значение для запроса
                for (var i = 0, iLen = list.length; i < iLen; i++) {
                    if (i) value += " OR ";// добавляем разделитель
                    value += "name = " + app.fun.repair(list[i] + key);
                };
                if (value) {// если удалось сформировать значение
                    response = cim.execQuery(app.fun.debug(
                        "SELECT name" +
                        " FROM CIM_DataFile" +
                        " WHERE " + value
                    ));
                    items = new Enumerator(response);
                    while (!items.atEnd()) {// пока не достигнут конец
                        item = items.item();// получаем очередной элимент коллекции
                        items.moveNext();// переходим к следующему элименту
                        for (var i = 0, iLen = list.length; i < iLen; i++) {
                            value = list[i] + key;// конечное значение
                            if (item.name && item.name.toLowerCase() == value.toLowerCase()) {
                                // характеристики
                                data["APP-ULUS"] = value;
                                data["APP-ULUS-DIR"] = list[i];
                                // останавливаемся на первом элименте
                                break;
                            };
                        };
                    };
                };
                // ищем корневую папку программы Chrome
                id = "";// сбрасываем идентификатор элимента
                key = "";// ключ для проверки
                list = [// список путей для проверки
                    "SOFTWARE\\Clients\\StartMenuInternet\\Google Chrome\\shell\\open\\command",
                    "SOFTWARE\\WOW6432Node\\Clients\\StartMenuInternet\\Google Chrome\\shell\\open\\command"
                ];
                value = "";// сбрасываем значение переменной
                if (registry) {// если удалось получить доступ к объекту
                    method = registry.methods_.item("getStringValue");
                    for (var i = 0, iLen = list.length; i < iLen && !value; i++) {
                        param = method.inParameters.spawnInstance_();
                        param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
                        param.sSubKeyName = app.fun.debug(list[i]);
                        param.sValueName = key;
                        item = registry.execMethod_(method.name, param);
                        if (!item.returnValue && item.sValue) value = app.fun.clear(item.sValue);
                    };
                }
                if (value) {// если удалось получить значение
                    list = value.split(app.val.keyDelim);
                    list.pop();// удаляем последнай элимент
                    // характеристики
                    data["APP-CHROME"] = value;
                    data["APP-CHROME-DIR"] = list.join(app.val.keyDelim);
                };
                // ищем корневую папку программы VLC
                id = "";// сбрасываем идентификатор элимента
                key = "";// ключ для проверки
                list = [// список путей для проверки
                    "SOFTWARE\\VideoLAN\\VLC",
                    "SOFTWARE\\WOW6432Node\\VideoLAN\\VLC"
                ];
                value = "";// сбрасываем значение переменной
                if (registry) {// если удалось получить доступ к объекту
                    method = registry.methods_.item("getStringValue");
                    for (var i = 0, iLen = list.length; i < iLen && !value; i++) {
                        param = method.inParameters.spawnInstance_();
                        param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
                        param.sSubKeyName = app.fun.debug(list[i]);
                        param.sValueName = key;
                        item = registry.execMethod_(method.name, param);
                        if (!item.returnValue && item.sValue) value = app.fun.clear(item.sValue);
                    };
                };
                if (value) {// если удалось получить значение
                    list = value.split(app.val.keyDelim);
                    list.pop();// удаляем последнай элимент
                    // характеристики
                    data["APP-VLC"] = value;
                    data["APP-VLC-DIR"] = list.join(app.val.keyDelim);
                };
                // вычисляем идентификатор TeamViewer
                id = "";// сбрасываем идентификатор элимента
                key = "ClientID";// ключ для проверки
                list = [// список путей для проверки
                    "SOFTWARE\\TeamViewer",
                    "SOFTWARE\\WOW6432Node\\TeamViewer"
                ];
                value = "";// сбрасываем значение переменной
                if (registry) {// если удалось получить доступ к объекту
                    method = registry.methods_.item("getDWORDValue");
                    for (var i = 0, iLen = list.length; i < iLen && !value; i++) {
                        param = method.inParameters.spawnInstance_();
                        param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
                        param.sSubKeyName = app.fun.debug(list[i]);
                        param.sValueName = key;
                        item = registry.execMethod_(method.name, param);
                        if (!item.returnValue && item.uValue) value = app.fun.clear(item.uValue);
                    };
                };
                if (value) {// если удалось получить значение
                    // характеристики
                    data["APP-TEAMVIEWER-ID"] = value;
                };
                // вычисляем сумарное название компьютера
                list = [];// очищаем значение переменной
                if (data["CPU-NAME"] && data["CPU-CORE"] && data["CPU-SPEED"]) list.push(app.fun.clear(data["CPU-NAME"].replace("Dual-Core", "Intel"), "Dual Core", "Xeon", "Pentium", "Celeron", "Core2 Duo", "Core", "Processor", "Athlon 64", "Athlon", /,.+/, /@.+/, /\d\.d+GHz/) + " " + data["CPU-CORE"] + "x" + data["CPU-SPEED"].replace(",", ".").replace(" МГц", "M").replace(" ГГц", "G") + "Hz");
                if (data["RAM-SIZE"] && data["RAM-SPEED"]) list.push(data["RAM-SIZE"].replace(" МБ", "MB").replace(" ГБ", "GB") + " " + data["RAM-SPEED"].replace(" МГц", "M").replace(" ГГц", "G") + "Hz");
                if (data["GPU-SIZE"] && data["GPU-NAME"] && (-1 != data["GPU-NAME"].indexOf("GeForce") || -1 != data["GPU-NAME"].indexOf("Radeon"))) list.push(data["GPU-SIZE"].replace(" МБ", "MB").replace(" ГБ", "GB") + " " + app.fun.clear(data["GPU-NAME"], "AMD", "NVIDIA", "GeForce", "Radeon", /\(.+/));
                if (data["HDD-SIZE"]) list.push(data["HDD-SIZE"].replace(" МБ", "MB").replace(" ГБ", "GB").replace(" ТБ", "TB") + " HDD");
                if (data["SSD-SIZE"]) list.push(data["SSD-SIZE"].replace(" МБ", "MB").replace(" ГБ", "GB").replace(" ТБ", "TB") + " SSD");
                if (data["USB-SIZE"]) list.push(data["USB-SIZE"].replace(" МБ", "MB").replace(" ГБ", "GB").replace(" ТБ", "TB") + " USB");
                if (data["ROM-TYPE"]) list.push(data["ROM-TYPE"]);
                if (list.length) data["DEV-DESCRIPTION"] = list.join("/");
                // вычисляем конечный индекс производительности
                if (benchmark) data["DEV-BENCHMARK"] = app.lib.num2str(benchmark, 5, ",", "");
            };
            // формируем вспомогательные переменные
            columns = [// список выводимых данных для вывода в одну строку
                "NET-HOST", "NET-DOMAIN",
                "SYS-NAME", "SYS-VERSION", "SYS-ARCHITECTURE", "SYS-KEY", "SYS-TIME", "SYS-DRIVE", "SYS-INSTALL", "SYS-RESET",
                "PCB-NAME", "PCB-SERIAL", "PCB-BIOS-SERIAL", "PCB-BIOS-RELEASE",
                "CPU-NAME", "CPU-SOCKET", "CPU-CORE", "CPU-SPEED", "CPU-SPEED-VAL",
                "RAM-SPEED", "RAM-SIZE", "RAM-SIZE-VAL",
                "GPU-NAME", "GPU-RESOLUTION", "GPU-SIZE", "GPU-SIZE-VAL",
                "MON-NAME", "MON-SERIAL", "MON-SIZE", "MON-SIZE-Z", "MON-RELEASE",
                "NET-NAME", "NET-MAC", "NET-IP-V4", "NET-SUBNET-V4", "NET-GATEWAY-V4", "NET-DNS-V4", "NET-DHCP-V4",
                "NET-IP-V6", "NET-SUBNET-V6", "NET-GATEWAY-V6", "NET-SPEED", "NET-SPEED-VAL", "NET-RESET",
                "SSD-NAME", "SSD-SERIAL", "SSD-SIZE", "SSD-SIZE-VAL",
                "HDD-NAME", "HDD-SERIAL", "HDD-SIZE", "HDD-SIZE-VAL",
                "USB-NAME", "USB-SERIAL", "USB-SIZE", "USB-SIZE-VAL",
                "ROM-NAME", "ROM-TYPE", "ROM-DRIVE",
                "USR-ACCOUNT", "USR-DOMAIN", "USR-LOGIN", "USR-NAME", "USR-SID",
                "USR-COUNTRY", "USR-CITY", "USR-COMPANY", "USR-DEPARTMENT", "USR-POSITION",
                "USR-EMAIL", "USR-PHONE", "USR-MOBILE", "USR-PROFILE",
                "DEV-NAME", "DEV-DESCRIPTION", "DEV-BENCHMARK"
            ];
            // получаем данные с потока ввода
            if (config.input) {// если нужно получить данные
                // получаем текстовые данные из потока
                app.fun.debug("Read input data");
                try {// пробуем получить данные
                    key = "windows-1251";
                    value = wsh.stdIn.readAll();
                    if (config.charset != key) {// если требуется перекодировка
                        value = app.wsh.iconv(config.charset, key, value);
                    };
                } catch (e) {// при возникновении ошибки
                    value = "";
                };
            };
            // обрабатываем данные с потока ввода
            items = null;// сбрасываем список элиментов
            if (config.input && value) {// если нужно выполнить
                delim = "";// сбрасываем разделитель значений
                app.fun.debug("Convert input data");
                switch (config.input) {// поддерживаемые служебные параметры
                    case "TSV":// заголовки для формата tsv
                        if (!delim) delim = app.val.tsvDelim;
                    case "CSV":// заголовки для формата csv
                        if (!delim) delim = app.val.csvDelim;
                        if (!items) items = app.lib.tsv2arr(value, false, delim);
                        if (items.length) columns = items.shift();
                    case "tsv":// значения для формата tsv
                        if (!delim) delim = app.val.tsvDelim;
                    case "csv":// значения для формата csv
                        if (!delim) delim = app.val.csvDelim;
                        if (!items) items = app.lib.tsv2arr(value, false, delim);
                        // преобразовываем список массивов в список объектов
                        for (var i = 0, iLen = items.length; i < iLen; i++) {
                            item = items[i];// получаем очередной элимент
                            item = app.lib.arr2obj(item, null, function (value, index) {
                                if (value) return columns[index];// возвращаем ключ
                            });
                            items[i] = item;// сохраняем изменения
                        };
                    case "ini":// значения для формата ini
                        if (!items) items = [app.lib.ini2obj(value, false)];
                        // формируем сводный элимент и обновляем список объектов
                        unit = {};// начальное значение сводного элимента
                        for (var i = 0, iLen = items.length; i < iLen; i++) {
                            item = items[i];// получаем очередной элимент
                            // добавляем значения в сводный элимент
                            for (var key in item) {// пробигаемся по свойствам
                                value = item[key];// получаем очередное значение
                                if (value) unit[key] = value;// в сводный элимент
                            };
                            // обновляем значения в текущем элименте
                            for (var key in data) {// пробигаемся по свойствам
                                value = data[key];// получаем очередное значение
                                item[key] = value; // в текущий элимент
                            };
                            items[i] = item;// сохраняем изменения
                        };
                        // обновляем значения в данных для переменных среды
                        for (var key in unit) {// пробигаемся по свойствам
                            value = unit[key];// получаем очередное значение
                            if (key && value && !(key in data)) {// если нужно добавить
                                data[key] = value;
                            };
                        };
                        break;
                };
            };
            // готовим данные в поток вывода
            if (config.output) {// если нужно вывести данные
                delim = "";// сбрасываем разделитель значений
                items = items || [data];// список значений для вывода
                isAddType = null;// сбрасываем значение
                app.fun.debug("Convert output data");
                switch (config.output) {// поддерживаемые служебные параметры
                    case "ini":// значения для формата ini
                        delim = app.val.argDelim + app.val.iniDelim + app.val.argDelim;
                        item = app.lib.sort(data, "asc");// сортируем ключи в объекте
                        value = app.lib.obj2str(item, false, app.val.linDelim, delim);
                        break;
                    case "TSV":// заголовки для формата tsv
                        if (!delim) delim = app.val.tsvDelim;
                    case "CSV":// заголовки для формата csv
                        if (!delim) delim = app.val.csvDelim;
                        isAddType = false;// добавляем заголовок
                    case "tsv":// значения для формата tsv
                        if (!delim) delim = app.val.tsvDelim;
                    case "csv":// значения для формата csv
                        if (!delim) delim = app.val.csvDelim;
                        value = app.lib.arr2tsv(items, columns, delim, isAddType);
                        break;
                };
            };
            // отправляем данные с поток вывода
            if (config.output && value) {// если нужно выполнить
                value += app.val.linDelim;
                // отправляем текстовые данные в поток
                app.fun.debug("Write output data");
                try {// пробуем отправить данные
                    wsh.stdOut.write(value);
                } catch (e) { };// игнорируем исключения
            };
            // добавляем новые переменные во временное окружение
            app.fun.debug("Set environment variables");
            items = shell.environment(app.val.envType);
            for (var key in data) {// пробигаемся по списку с данными
                value = data[key];// получаем очередное значение
                setEnv(items, key, value);
            };
            // готовим командную строку для вызова
            items = [];// сбрасываем список аргументов
            length = wsh.arguments.length;// получаем длину
            for (index = offset; index < length; index++) {
                value = wsh.arguments.item(index);// получаем очередное значение
                value = value.split(app.val.getDelim).join(app.val.setDelim);
                value = shell.expandEnvironmentStrings(value);
                if (!value || -1 != value.indexOf(app.val.argDelim)) {// если есть разделитель
                    value = app.val.argWrap + value + app.val.argWrap;
                };
                items.push(value);
            };
            command = items.join(app.val.argDelim);
            // вызываем командную строку
            if (command) {// если есть команда
                mode = !config.silent ? app.val.runStyle : 0;
                app.fun.debug("Calling an external command");
                try {// пробуем выполнить команду
                    value = shell.run(command, mode, !config.nowait);
                    if (config.nowait) value = app.val.defReturn;
                } catch (e) {// при возникновении ошибки
                    value = app.val.defReturn;
                };
            } else value = app.val.defReturn;
            // завершаем сценарий кодом
            app.fun.debug("Exit with code " + value);
            app.fun.debug(config.debug);
            wsh.quit(value);
        }
    });
})(WSH, env);
// запускаем инициализацию
env.init();