# Описание
`JScript` для добавления в **переменные среды** временных переменных. Которые затем можно использовать в вызове других скриптов и приложений. Данные для переменных получаются через `WMI` с **локального** или **удалённого** компьютера в сети. Дополнительно переменные можно **импортировать** из файла и **экспортировать** в файл, поддерживается несколько форматов.

Достаточно часто **системному администратору** требуется получить общую информацию о **компьютере** и **пользователе**, чтобы затем её использовать в вызове другого скрипта или приложений. А также эту информацию иногда требуется сохранить в файл, например для инвентаризационного учёта или для использования в дальнейшем. Данный скрипт предоставляет такие возможности.

# Использование
В командной строке **Windows** введите следующую команду. Все параметры можно передавать в произвольном порядке. Если необходимо скрыть отображение окна консоли, то вместо `cscript` можно использовать `wscript`.
```bat
cscript env.min.js [\\<context>] [<input>@<charset>] [<output>] [<option>...] ...
```
- `<context>` - Сетевое **имя** или **ip** адрес компьютера, в контексте которого нужно получить данные для переменных.
- `<input>` - Формат текстовых данных стандартного потока ввода для **импорта** переменных.
    - **ini** - Получает из потока данные для переменных в `ini` формате.
    - **csv** - Получает данные в `csv` формате (заглавное написание ожидает ещё и заголовок).
    - **tsv** - Получает данные в `tsv` формате (заглавное написание ожидает ещё и заголовок).
- `<charset>` - Кодировка текстовых данных, направленных в стандартный поток ввода (можно использовать значение `auto`).
- `<output>` - Формат текстовых данных стандартного потока вывода для **экспорта** переменных.
    - **ini** - Отправляет в поток данные переменных в `ini` формате.
    - **csv** - Отправляет данные в `csv` формате (заглавное написание добавляет ещё и заголовок).
    - **tsv** - Отправляет данные в `tsv` формате (заглавное написание добавляет ещё и заголовок).
- `<option>` - Дополнительные опции (можно указать несколько).
    - **silent** - Последующие команды выполнить без отображения.
    - **nowait** - Последующие команды выполнить без ожидания.
    - **debug** - Ввести в стандартный поток ошибок отладочную информацию.
- `...` - Далее указывается командная строка для выполнения, в которой будут доступны эти **переменные среды**.

# Переменные среды
Скрипт добавляет описанные ниже временные переменные в среду процесса. Если нет данных для формирования переменной, то переменная не создаётся.

## Операционная система
- `SYS-ARCHITECTURE` - Архитектура операционной системы `x64` и `x86`.
- `SYS-DESCRIPTION` - Описание системы (компьютера), заданное пользователем.
- `SYS-DRIVE` - Буква системного диска (вместе с двоеточием).
- `SYS-INSTALL` - Дата и время установки системы в формате `ДД.ММ.ГГГГ ЧЧ:ММ:СС`.
- `SYS-INSTALL-DATE` - Только дата установки системы в формате `ДД.ММ.ГГГГ`.
- `SYS-KEY` - Ключи активации операционной системы.
- `SYS-NAME` - Заданное производителем полное название операционной системы.
- `SYS-RESET` - Дата и время перезагрузки системы в формате `ДД.ММ.ГГГГ ЧЧ:ММ:СС`.
- `SYS-RESET-DATE` - Только дата перезагрузки системы в формате `ДД.ММ.ГГГГ`.
- `SYS-SERIAL` - Серийный номер операционной системы.
- `SYS-TIME` - Текущая дата и время в системе в формате `ДД.ММ.ГГГГ ЧЧ:ММ:СС`.
- `SYS-TIME-DATE` - Только текущая дата в системы в формате `ДД.ММ.ГГГГ`.
- `SYS-VERSION` - Версия операционной системы.

## Пользователь
- `USR-ACCOUNT` - Аккаунт пользователя, который последним использовал компьютер.
- `USR-ACCOUNT-DN` - Значение `Distinguished Name` пользователя в домене.
- `USR-DOMAIN` - Доменная часть аккаунта пользователя.
- `USR-LOGIN` - Часть логина в аккаунте пользователя.
- `USR-HOME` - Полный путь к домашнему каталогу пользователя.
- `USR-PROFILE` - Полный путь к папке профиля пользователя.
- `USR-NAME` - Отображаемое имя пользователя.
- `USR-NAME-FIRST` - Первая часть отображаемого имени пользователя.
- `USR-NAME-SECOND` - Втор часть отображаемого имени пользователя.
- `USR-NAME-THIRD` - Третья часть отображаемого имени пользователя.
- `USR-NAME-FOURTH` - Четвёртая часть отображаемого имени пользователя.
- `USR-COUNTRY` - Название страны пользователя.
- `USR-COUNTRY-ID` - Идентификатор страны пользователя.
- `USR-CITY` - Название города пользователя.
- `USR-COMPANY` - Название организации пользователя.
- `USR-DEPARTMENT` - Название подразделения пользователя.
- `USR-POSITION` - Название должности пользователя.
- `USR-EMAIL` - Адрес электронной почты пользователя.
- `USR-MOBILE` - Номер мобильного телефона пользователя.
- `USR-PHONE` - Номер телефона пользователя.
- `USR-INFO` - Заметка о пользователе.
- `USR-SID` - Идентификатор безопасности пользователя.

## Компьютер
- `DEV-TYPE`  Тип компьютера `Desktop`, `Notebook`, `Tablet`, `Server` или `Controller`.
- `DEV-NAME` - Заданное производителем полное название модели.
- `DEV-DESCRIPTION` - Формируемое скриптом описание компьютера из его характеристик.
- `DEV-BENCHMARK` - Вычисляемый скриптом рейтинг производительности компьютера.

## Материнская плата
- `PCB-NAME` - Заданное производителем полное название модели.
- `PCB-SERIAL` - Серийный номер материнской платы.
- `PCB-BIOS-MANUFACTURE` - Название производителя BIOS материнской платы.
- `PCB-BIOS-RELEASE` - Дата и время прошивки BIOS материнской платы.
- `PCB-BIOS-RELEASE-DATE` - Только дата прошивки BIOS материнской платы.
- `PCB-BIOS-SERIAL` - Серийный номер, хранящийся в BIOS материнской платы.
- `PCB-BIOS-VERSION` - Версия прошивки BIOS материнской платы.

## Центральный процессор
- `CPU-ARCHITECTURE` - Архитектура центрального процессора `x64` и `x86`.
- `CPU-CACHE-L1` - Размер L1 кэша с размерностью `KB`, `MB` и так далее.
- `CPU-CACHE-L2` - Размер L2 кэша с размерностью `KB`, `MB` и так далее.
- `CPU-CACHE-L3` - Размер L3 кэша с размерностью `KB`, `MB` и так далее.
- `CPU-CORE` - Количество ядер центрального процессора.
- `CPU-NAME` - Заданное производителем полное название модели.
- `CPU-SOCKET` - Название сокета центрального процессора.
- `CPU-SPEED` - Тактовая частота с размерностью `MHz`, `GHz` и так далее.
- `CPU-SPEED-VAL` - Значение тактовой частота в `Hz`.
- `CPU-VERSION` - Версия релиза центрального процессора.

## Оперативная память
- `RAM-SIZE` - Объём оперативной памяти с размерностью `MB`, `GB` и так далее.
- `RAM-SIZE-VAL` - Значение объёма оперативной памяти в `byte`.
- `RAM-SPEED` - Тактовая частота с размерностью `MHz`, `GHz` и так далее.
- `RAM-SPEED-VAL` - Значение тактовой частота в `Hz`.

## Графический процессор
- `GPU-COLOR` - Глубина цвета графического процессора с размерностью в `bit`.
- `GPU-COLOR-VAL` - Значение глубины цвета графического процессора в `bit`.
- `GPU-FREQUENCY` - Частота обновления с размерностью в `Hz`.
- `GPU-FREQUENCY-VAL` - Значение частота обновления в `Hz`.
- `GPU-NAME` - Заданное производителем полное название модели.
- `GPU-RESOLUTION` - Разрешение экрана, подключенного к графическому процессору.
- `GPU-RESOLUTION-X` - Разрешение экрана по горизонтали.
- `GPU-RESOLUTION-Y` - Разрешение экрана по вертикали.
- `GPU-SIZE` - Объём памяти с размерностью `MB`, `GB` и так далее.
- `GPU-SIZE-VAL` - Значение объёма памяти графического процессора в `byte`.
- `GPU-VERSION` - Версия драйвера графического процессора.

## Монитор
- `MON-NAME` - Заданное производителем полное название модели.
- `MON-SERIAL` - Серийный номер, хранящийся в свойствах монитора.
- `MON-SIZE` - Линейные размеры дисплея монитора.
- `MON-SIZE-X` - Линейный размер дисплея по горизонтали в `cm`.
- `MON-SIZE-Y` - Линейный размер дисплея по вертикали в `cm`.
- `MON-SIZE-Z` - Линейный размер дисплея по диагонали в `in`.
- `MON-RELEASE` - Дата и время производства монитора.
- `MON-RELEASE-DATE` - Только дата производства монитора.

## Сетевой адаптер
- `NET-IP-V4` - IPv4 адрес активного сетевого адаптера.
- `NET-IP-V6` - IPv6 адрес активного сетевого адаптера.
- `NET-SUBNET-V4` - IPv4 маска подсети активного сетевого адаптера.
- `NET-SUBNET-V6` - IPv6 маска подсети активного сетевого адаптера.
- `NET-GATEWAY-V4` - IPv4 шлюз активного сетевого адаптера.
- `NET-GATEWAY-V6` - IPv6 шлюз активного сетевого адаптера.
- `NET-DNS-V4` - IPv4 адрес DNS сервера сетевого адаптера.
- `NET-DNS-V6` - IPv6 адрес DNS сервера сетевого адаптера.
- `NET-DHCP-V4` - IPv4 адрес DHCP сервера локальной сети.
- `NET-DOMAIN` - Домен в котором зарегистрирован компьютер.
- `NET-HOST` - Зарегистрированное сетевое имя компьютера.
- `NET-HOST-DN` - Значение `Distinguished Name` компьютера в домене.
- `NET-MAC` - Физический адрес активного сетевого адаптера.
- `NET-NAME` - Заданное производителем название сетевого адаптера.
- `NET-RESET` - Дата и время обновления адресов в формате `ДД.ММ.ГГГГ ЧЧ:ММ:СС`.
- `NET-RESET-DATE` - Только дата обновления адресов в формате `ДД.ММ.ГГГГ`.
- `NET-SPEED` - Скорость подключения с размерностью `Mbps`, `Gbps` и так далее.
- `NET-SPEED-VAL` - Значение скорость подключения в `bps`.

## Жёсткий диск
- `HDD-NAME` - Заданное производителем название жёсткого диска.
- `HDD-SERIAL` - Серийный номер жёсткого диска.
- `HDD-SIZE` - Объём жёсткого диска с размерностью `MB`, `GB` и так далее.
- `HDD-SIZE-VAL` - Значение объёма жёсткого диска в `byte`.
- `HDD-VERSION` - Версия прошивки жёсткого диска.

## Твердотельный накопитель
- `SSD-NAME` - Заданное производителем название твердотельного накопителя.
- `SSD-SERIAL` - Серийный номер твердотельного накопителя.
- `SSD-SIZE` - Объём твердотельного накопителя с размерностью `MB`, `GB` и так далее.
- `SSD-SIZE-VAL` - Значение объёма твердотельного накопителя в `byte`.
- `SSD-VERSION` - Версия прошивки твердотельного накопителя.

## Сменный накопитель
- `USB-NAME` - Заданное производителем название сменного накопителя.
- `USB-SERIAL` - Серийный номер сменного накопителя.
- `USB-SIZE` - Объём сменного накопителя с размерностью `MB`, `GB` и так далее.
- `USB-SIZE-VAL` - Значение объёма сменного накопителя в `byte`.
- `USB-VERSION` - Версия прошивки сменного накопителя.

## Специализированный накопитель
- `SCM-NAME` - Заданное производителем название специализированного накопителя.
- `SCM-SERIAL` - Серийный номер специализированного накопителя.
- `SCM-SIZE` - Объём специализированного накопителя с размерностью `MB`, `GB` и так далее.
- `SCM-SIZE-VAL` - Значение объёма специализированного накопителя в `byte`.
- `SCM-VERSION` - Версия прошивки специализированного накопителя.

## Оптический привод
- `ROM-NAME` - Заданное производителем название оптического привода.
- `ROM-DRIVE` - Буква оптического привода (вместе с двоеточием).
- `ROM-TYPE` - Тип оптического привода `DVD-RW`, `CD` и так далее.

## Программное обеспечение

### Браузер Google Chrome
- `APP-CHROME` - Полный путь исполняемого файла приложения.
- `APP-CHROME-DIR` - Полный путь каталога приложения.

### Проигрыватель VLC Media Player
- `APP-VLC` - Полный путь исполняемого файла приложения.
- `APP-VLC-DIR` - Полный путь каталога приложения.

### Приложение Spargo eFarma
- `APP-EFARMA-CLIENT` - Полный путь исполняемого файла клиента.
- `APP-EFARMA-CASHER` - Полный путь исполняемого файла кассы.
- `APP-EFARMA-UPDATER` - Полный путь исполняемого файла сервера обновлений.
- `APP-EFARMA-LICENSE` - Полный путь файла лицензии.
- `APP-EFARMA-DIR` - Полный путь каталога приложения.

### Приложение SoftLine Ulus
- `APP-ULUS` - Полный путь исполняемого файла приложения.
- `APP-ULUS-DIR` - Полный путь каталога приложения.

### Приложение TeamViewer
- `APP-TEAMVIEWER-ID` - Идентификатор устройства.

### Приложение Intel Endpoint Management Assistant
- `APP-INTEL-EMA-ID` - Идентификатор конечной точки.

## Другие переменные
- `BAK-DRIVE` - Буква диска для резервных копий (вместе с двоеточием).

# Примеры использования

## Получение данных
Вывести в консоль все созданные переменные среды в контексте текущего компьютера.
```bat
cscript env.min.js ini
```
Вывести в консоль все созданные переменные среды в контексте компьютера `RUS000WS001`.
```bat
cscript env.min.js ini \\RUS000WS001
```

## Экспорт данных
Экспортировать все созданные переменные среды в `ini` файл с кодировкой `CP 866` в контексте текущего компьютера.
```bat
cscript /nologo env.min.js ini > %COMPUTERNAME%.ini
```
Экспортировать все созданные переменные среды в `ini` файл с кодировкой `UTF-16 LE` в контексте текущего компьютера.
```bat
cscript /nologo /u env.min.js ini > %COMPUTERNAME%.ini
```
Экспортировать все созданные переменные среды в `csv` файл без заголовка и с кодировкой `UTF-16 LE` в контексте компьютера `RUS000WS001`.
```bat
cscript /nologo /u env.min.js \\RUS000WS001 csv > RUS000WS001.csv
```
Экспортировать все созданные переменные среды в `csv` файл с заголовком и с кодировкой `UTF-16 LE` в контексте компьютера `RUS000WS001`.
```bat
cscript /nologo /u env.min.js \\RUS000WS001 CSV > RUS000WS001.csv
```

## Импорт данных
Импортировать переменные среды из `ini` файла с кодировкой `CP 866` и вывести их в консоль.
```bat
cscript /nologo env.min.js ini@cp866 \\ ini < %COMPUTERNAME%.ini
```
Импортировать переменные среды из `ini` файла с кодировкой `UTF-16 LE` и затем ещё и получить переменные среды в контексте компьютера `RUS000WS001` и вывести их в консоль.
```bat
cscript /nologo /u env.min.js ini@auto \\RUS000WS001 ini < RUS000WS001.ini
```
Импортировать переменные среды из `csv` файла с заголовком и с кодировкой `UTF-16 LE` и затем ещё и получить переменные среды в контексте компьютера `RUS000WS001` и вывести их в консоль.
```bat
cscript /nologo /u env.min.js CSV@auto \\RUS000WS001 ini < RUS000WS001.csv
```

## Использование данных
Выполнить тихую установку `msi` пакета с именем, соответствующим разрядности операционной системы текущего компьютера.
```bat
cscript env.min.js %SYS-ARCHITECTURE%.msi /quiet /qn /norestart
```
Открыть в **VLC Media Player** воспроизведение `mp4` видео файла с именем, соответствующим логину пользователя и не дожидаться окончания воспроизведения.
```bat
wscript env.min.js nowait "%APP-VLC%" %USR-LOGIN%.mp4
```
Открыть в **Проводнике** домашний каталог пользователя, который последним использовал удалённый компьютер `RUS000WS001`.
```bat
wscript env.min.js \\RUS000WS001 explorer.exe "%USR-HOME%"
```

## Инвентаризация компьютеров
Загрузить из `txt` файла список компьютеров и сохранить о них информацию в папке `inventory` в виде `ini` файлов.
```bat
for /f "eol=; tokens=* delims=, " %%i in (list.txt) do (
    cscript /nologo /u env.min.js \\%%i ini > inventory\%%i.ini
)
```
Загрузить из `txt` файла список компьютеров и сохранить о них информацию в один `csv` файл с заголовком.
```bat
cscript /nologo /u env.min.js \\ CSV > inventory.csv
for /f "eol=; tokens=* delims=, " %%i in (list.txt) do (
    cscript /nologo /u env.min.js \\%%i csv >> inventory.csv
)
```
Сконвертировать и объединить `ini` файлы из папке `inventory` в один `tsv` файл с заголовком.
```bat
cscript /nologo /u env.min.js \\ TSV > inventory.tsv
for %%i in (inventory\*.ini) do (
    cscript /nologo /u env.min.js \\ ini@auto tsv < %%i >> inventory.tsv
)
```