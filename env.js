/* 0.1.3 ���������� �������������� ���������� �����

cscript env.min.js [<context>] [<action>] ...

<context>   - � ��������� ������ ���������� �������� ����������
<action>    - �������� ������� ����� ���������
    silent  - ����������� ������� ��������� ��� �����������
    print   - ������� �������������� ���������� � �������
    csv     - ������� �������������� ���������� � ������� csv

*/

var env = new App({
    aptPref: 'apt',                                     // ������� � ����� ���������� ��� ����������� ������ ��������� ������
    aptLen: 3,                                          // ����������� ���� ��������� ��� ����� ��������� ������
    aptNone: 'XXX',                                     // �������� ��� �������� ��������� ������
    wsPref: 'c',                                        // ������� � ����� ���������� ��� ����������� ������ ����������
    wsLen: 1,                                           // ����������� ���� ��������� ��� ����� ����������
    wsFirstDesc: '��������',                            // �������� ������� ���������� � �������� ������
    wsNextDesc: '��������������',                       // �������� ���������� ���������� � �������� ������
    wsNoneDesc: '���������',                            // �������� �� ����������� ���������� � �������� ������
    supportLogin: 'apteka',                             // ����� ��� ����������� ���������
    supportToken: 'beb120e2949d34cd65a82b16071e8836',   // ����� ������ ��� ����������� ���������
    runStyle: 1,                                        // ����� ����������� ���������� �������� �� ���������
    defReturn: 99,                                      // �������� ������������ �� ���������
    driveMinSize: 26 * 1024 * 1024 * 1024,              // ����������� ����� ����� ����� ��� ��������� ����� � ������
    argWrap: '"',                                       // ���������� ����������
    keyWrap: '%',                                       // ���������� ������
    argDelim: ' ',                                      // ����������� �������� ����������
    getDelim: '+',                                      // ����������� ������� ����� ��������
    setDelim: '#',                                      // ����������� �� ������� ����� ��������
    csvDelim: ';',                                      // ����������� �������� ��� ����� ��������
    envType: 'Process'                                  // ��� ����������� ����������� ���������
});

// ���������� ��������� �������� ����������
(function (wsh, app, undefined) {
    app.lib.extend(app, {
        fun: {// ��������� ������� �������� ����������
            wql2date: function (wql) {// ��������������� ���� �� �������
                //@param date {string} - ���� �� �������
                //@return {date} - ��������������� ����
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
            bin2key: function (bin) {// ��������������� �������� ������ � ���� ��������
                //@param bin {binary} - �������� ������ ����� ��������
                //@return {string} - ��������� �������� ����� ��������
                var isWin8, list, cur, last, part, pref = 'N',
                    chars = 'BCDFGHJKMPQRTVWXY2346789',
                    key = '', offset = 52;

                list = bin.toArray();
                isWin8 = Math.floor(list[66] / 6) & 1;
                list[66] = list[66] & 247 | (isWin8 & 2) * 4;
                for (var i = 24; i > -1; i--) {// ����������� �� �������
                    cur = 0;// ���������� �������� �������
                    for (var j = 14; j > -1; j--) {// ����������� �� �������
                        cur = cur * 256;
                        cur = list[j + offset] + cur;
                        list[j + offset] = Math.floor(cur / 24);
                        cur = cur % 24;
                    };
                    key = chars.substr(cur, 1) + key;
                    last = cur;
                };
                if (1 == isWin8) {// ���� ��� Windows 8
                    part = key.substr(1, last);
                    key = key.substr(1).replace(part, part + pref);
                };
                // ���������� ���������
                return [// ����������� ����
                    key.substr(0, 5),
                    key.substr(5, 5),
                    key.substr(10, 5),
                    key.substr(15, 5),
                    key.substr(20, 5)
                ].join('-');
            },
            info2str: function (info, decim, base) {// �������������� ����� ���������� � ������
                //@param info {number} - ����������� ���������� � ����� ��� ������
                //@param decim {number} - ���������� ������ ����� �������
                //@param base {number} - ���� ��� ��������������
                //@return {string} - ��������� �������� � ������ ������ �������
                var factor, value, prefix = '��������';

                if (!base || base < 2) base = 1024;
                if (!decim || decim < 0) decim = 0;
                factor = Math.pow(10, decim);
                for (var i = -1; info >= base; i++) info = info / base;
                value = Math.ceil(info * factor) / factor;
                value = app.lib.num2str(value, i > -1 ? decim : 0, ',', '');
                value += ' ' + prefix.charAt(i);
                return value;
            },
            clear: function (value) {// ������� ����� �� ������ ��������
                //@param value {string} - ���� ��� ������� �� ������ ������
                //@return {string} - ��������� �����
                value = value ? '' + value : '';
                // ������� �� ������� �����������
                if ('INVALID' == value) value = '';
                if ('To be filled by O.E.M.' == value) value = '';
                if ('Default string' == value) value = '';
                if ('empty' == value) value = '';
                if ('None' == value) value = '';
                // ������� �� ����������� �����������
                for (var i = 1, iLen = arguments.length; i < iLen; i++) {
                    value = value.replace(arguments[i], '');
                };
                // ������� �� ����������� ���������
                return value
                    .replace(/^['"]|["']$/g, '')                // ������� � ������ � � �����
                    .replace(/^\s+|\s+$/g, '')                  // ���������� ������� � ������ � � �����
                    .replace(/\.+$/, '')                        // ����� � ����� ������
                    .replace(/\(R\)/gi, '')                     // ������ �������
                    .replace(/\(Registered Trademark\)/gi, '')  // �������� �����
                    .replace(/\(Microsoft Corporation\)/gi, '') // �������� �����
                    .replace(/\(���������� ����������\)/gi, '') // �������� �����
                    .replace(/\(����������\)/gi, '')            // �������� �����
                    .replace(/\(TM\)/gi, '')                    // ������ �������� �����
                    .replace(/\s(?=\s)/gi, '')                  // ������ ���������� �������
                    ;
            },
            repair: function (value) {// ���������� ����� ��� �������
                //@param value {string} - ����� ��� �����������
                //@return {string} - ������������ �����
                value = "'" + (value ? value : '') + "'";
                return value.replace(/\\/g, '\\\\');
            }
        },
        init: function () {// ������� ������������� ����������
            var shell, fso, xml, key, value, list, locator, service, registry, method,
                param, item, items, command, id, time, drive, score, pattern, total,
                context, path, delim = '\\', benchmark = 0, index = 0,
                host = '', domain = '', user = {}, data = {};

            time = new Date();
            // �������� �������� ���������
            id = '.';// ��������� �������� ��������������
            if (wsh.arguments.length > 0) {// ���� ������ ����
                value = wsh.arguments.item(0);
                if (!value.indexOf(delim + delim) && -1 == value.indexOf(delim, 2 * delim.length)) {
                    id = context = value.substr(2 * delim.length);
                    index++;
                };
            };
            // ������ ��������� �������
            shell = new ActiveXObject('WScript.Shell');
            xml = new ActiveXObject('MSXML2.DOMDocument');
            fso = new ActiveXObject('Scripting.FileSystemObject');
            locator = new ActiveXObject('wbemScripting.Swbemlocator');
            // ����������� ��������� �������
            locator.security_.impersonationLevel = 3;
            try {// ������� ������������ � ����������
                service = locator.connectServer(id, 'root\\CIMV2');
                registry = locator.connectServer(id, 'root\\default').get('stdRegProv');
            } catch (e) { service = null; };
            if (service) {// ���� ������� �������� ������ � �������
                // ��������� ���� ������������ �������
                method = registry.methods_.item('getBinaryValue');
                param = method.inParameters.spawnInstance_();
                param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
                param.sSubKeyName = 'SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion';
                param.sValueName = 'DigitalProductId';
                item = registry.execMethod_(method.name, param);
                if (!item.returnValue) {// ���� ������� ��������� ��������
                    value = app.fun.bin2key(item.uValue);// ��������������� �������� �����
                    if (value && 'BBBBB-BBBBB-BBBBB-BBBBB-BBBBB' != value) {// ���� ���� �� ����
                        data['SYS-KEY'] = value;
                    };
                };
                // ��������� �������������� ������������ �������
                id = '';// ���������� ������������� ��������
                response = service.execQuery(
                    "SELECT *" +
                    " FROM Win32_OperatingSystem" +
                    " WHERE primary = TRUE"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// ���� �� ��������� �����
                    item = items.item();// �������� ��������� ������� ���������
                    items.moveNext();// ��������� � ���������� ��������
                    if (value = item.systemDrive) drive = value;
                    if (value = item.localDateTime) time = app.fun.wql2date(value);
                    // ��������������
                    if (value = app.fun.clear(item.caption, '����������', 'Microsoft', 'Edition', 'x64', ',')) data['SYS-NAME'] = value;
                    if (value = app.fun.clear(item.version)) data['SYS-VERSION'] = value;
                    if (value = item.localDateTime) data['SYS-TIME'] = app.lib.date2str(app.fun.wql2date(value), 'd.m.Y H:i:s');
                    if (value = app.fun.clear(item.systemDrive)) data['SYS-DRIVE'] = value;
                    if (value = item.installDate) data['SYS-INSTALL'] = app.lib.date2str(app.fun.wql2date(value), 'd.m.Y H:i:s');
                    if (value = item.lastBootUpTime) data['SYS-RESET'] = app.lib.date2str(app.fun.wql2date(value), 'd.m.Y H:i:s');
                    if (value = app.fun.clear(item.serialNumber)) data['SYS-SERIAL'] = value;
                    if (value = app.fun.clear(item.description)) data['SYS-DESCRIPTION'] = value;
                    data['SYS-ARCHITECTURE'] = item.osArchitecture && !item.osArchitecture.indexOf('64') ? 'x64' : 'x86';
                    // ��������������� �� ������ ��������
                    break;
                };
                // ��������� �������������� ����������� �����
                id = '';// ���������� ������������� ��������
                response = service.execQuery(
                    "SELECT manufacturer, product, serialNumber" +
                    " FROM Win32_BaseBoard" +
                    " WHERE hostingBoard = TRUE"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// ���� �� ��������� �����
                    item = items.item();// �������� ��������� ������� ���������
                    items.moveNext();// ��������� � ���������� ��������
                    // ��������������
                    if (value = app.fun.clear(item.product)) data['PCB-NAME'] = value;
                    if (value) if (value = app.fun.clear(item.manufacturer)) data['PCB-NAME'] = value.split(' ')[0] + ' ' + app.fun.clear(item.product);
                    if (value = app.fun.clear(item.serialNumber)) data['PCB-SERIAL'] = value;
                    // ��������������� �� ������ ��������
                    break;
                };
                // ��������� �������������� �������� ����������
                id = '';// ���������� ������������� ��������
                response = service.execQuery(
                    "SELECT *" +
                    " FROM Win32_NetworkAdapterConfiguration" +
                    " WHERE ipEnabled = TRUE"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// ���� �� ��������� �����
                    item = items.item();// �������� ��������� ������� ���������
                    items.moveNext();// ��������� � ���������� ��������
                    if (value = item.interfaceIndex) id = value;
                    // �������� ����� 
                    if (null != item.ipAddress) {// ���� ���� ������ ip �������
                        list = item.ipAddress.toArray();// �������� ��������� ������
                        for (var i = 0, iLen = list.length; i < iLen; i++) {
                            value = app.fun.clear(list[i]);// �������� ��������� ��������
                            if (value && -1 != value.indexOf('.') && !data['NET-IP-V4']) data['NET-IP-V4'] = value;
                            if (value && -1 == value.indexOf('.') && !data['NET-IP-V6']) data['NET-IP-V6'] = value;
                        };
                    };
                    // �������� ����
                    if (null != item.defaultIPGateway) {// ���� ���� ������ ip �������
                        list = item.defaultIPGateway.toArray();// �������� ��������� ������
                        for (var i = 0, iLen = list.length; i < iLen; i++) {
                            value = app.fun.clear(list[i]);// �������� ��������� ��������
                            if (value && -1 != value.indexOf('.') && !data['NET-GATEWAY-V4']) data['NET-GATEWAY-V4'] = value;
                            if (value && -1 == value.indexOf('.') && !data['NET-GATEWAY-V6']) data['NET-GATEWAY-V6'] = value;
                        };
                    };
                    // �������� dns
                    if (null != item.dnsServerSearchOrder) {// ���� ���� ������ ip �������
                        list = item.dnsServerSearchOrder.toArray();// �������� ��������� ������
                        for (var i = 0, iLen = list.length; i < iLen; i++) {
                            value = app.fun.clear(list[i]);// �������� ��������� ��������
                            if (value && -1 != value.indexOf('.') && !data['NET-DNS-V4']) data['NET-DNS-V4'] = value;
                            if (value && -1 == value.indexOf('.') && !data['NET-DNS-V6']) data['NET-DNS-V6'] = value;
                        };
                    };
                    // �������� �����
                    if (null != item.ipSubnet) {// ���� ���� ������ ip �������
                        list = item.ipSubnet.toArray();// �������� ��������� ������
                        for (var i = 0, iLen = list.length; i < iLen; i++) {
                            value = app.fun.clear(list[i]);// �������� ��������� ��������
                            if (value && -1 != value.indexOf('.') && !data['NET-SUBNET-V4']) data['NET-SUBNET-V4'] = value;
                            if (value && -1 == value.indexOf('.') && !data['NET-SUBNET-V6']) data['NET-SUBNET-V6'] = value;
                        };
                    };
                    // ��������������
                    if (value = app.fun.clear(item.dhcpServer)) data['NET-DHCP-V4'] = value;
                    if (value = app.fun.clear(item.description, '������� �������', '�������', '��� ����������� ����', '������� �����', '����������', 'NIC (NDIS 6.20)', '- �������� ������������ �������')) data['NET-NAME'] = value;
                    if (value = app.fun.clear(item.macAddress)) data['NET-MAC'] = value;
                    // ��������������� �� ������ ��������
                    break;
                };
                // ��������� �������������� �������� ��������
                score = 0;// �������� ������� ������
                response = service.execQuery(
                    "SELECT speed, timeOfLastReset" +
                    " FROM Win32_NetworkAdapter" +
                    " WHERE netEnabled = TRUE" +
                    " AND interfaceIndex = " + app.fun.repair(id)
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// ���� �� ��������� �����
                    item = items.item();// �������� ��������� ������� ���������
                    items.moveNext();// ��������� � ���������� ��������
                    // ��������������
                    if (value = item.speed) data['NET-SPEED'] = app.fun.info2str(value, 0, 1000) + '���/�';
                    if (value = item.speed) data['NET-SPEED-VAL'] = value;
                    if (value = item.timeOfLastReset) data['NET-RESET'] = app.lib.date2str(app.fun.wql2date(value), 'd.m.Y H:i:s');
                    // �������� ������� ������������������
                    if (value = item.speed) score += 8.12567 * Math.sqrt(value / 100 / 1000 / 1000);
                    // ��������������� �� ������ ��������
                    break;
                };
                if (score) benchmark = benchmark ? Math.min(benchmark, score) : score;
                // ��������� �������������� ������� �������������
                id = '';// ���������� ������������� ��������
                response = service.execQuery(
                    "SELECT *" +
                    " FROM Win32_ComputerSystem"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// ���� �� ��������� �����
                    item = items.item();// �������� ��������� ������� ���������
                    items.moveNext();// ��������� � ���������� ��������
                    if (value = item.dnsHostName) host = value;
                    if (value = item.name) if (!host) host = value.toLowerCase();
                    if (item.domain != item.workgroup) domain = item.domain;
                    if (value = item.userName) user.login = id = value;
                    if (value = item.userName) user.domain = value.split(delim)[0];
                    if (value = item.userName) user.account = value.split(delim)[1];
                    // ��������������
                    if (value = app.fun.clear(host)) data['NET-HOST'] = value;
                    if (value = app.fun.clear(item.domain)) data['NET-DOMAIN'] = value;
                    if (value = app.fun.clear(user.login)) data['USR-LOGIN'] = value;
                    if (value = app.fun.clear(user.domain)) data['USR-DOMAIN'] = value;
                    if (value = app.fun.clear(user.account)) data['USR-ACCOUNT'] = value;
                    // ��������������� �� ������ ��������
                    break;
                };
                // �������� �� ������ ������������ �������
                if (!id) {// ���� ������������� ������������ ����������
                    list = [];// ���������� ������ ��������
                    // ��������� ��� ������������ �����������
                    method = registry.methods_.item('getStringValue');
                    param = method.inParameters.spawnInstance_();
                    param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
                    param.sSubKeyName = 'SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon';
                    param.sValueName = 'DefaultDomainName';
                    item = registry.execMethod_(method.name, param);
                    if (!item.returnValue && item.sValue) list.push(item.sValue);
                    // ��������� ����� ������������ �����������
                    method = registry.methods_.item('getStringValue');
                    param = method.inParameters.spawnInstance_();
                    param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
                    param.sSubKeyName = 'SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon';
                    param.sValueName = 'DefaultUserName';
                    item = registry.execMethod_(method.name, param);
                    if (!item.returnValue && item.sValue) list.push(item.sValue);
                    // ��������� ������������� ������������
                    if (2 == list.length) user.login = id = list.join(delim);
                    if (2 == list.length) user.domain = list[0];
                    if (2 == list.length) user.account = list[1];
                    // ��������������
                    if (value = app.fun.clear(user.login)) data['USR-LOGIN'] = value;
                    if (value = app.fun.clear(user.domain)) data['USR-DOMAIN'] = value;
                    if (value = app.fun.clear(user.account)) data['USR-ACCOUNT'] = value;
                };
                // ��������� �������������� ������������
                response = service.execQuery(
                    "SELECT fullName, sid" +
                    " FROM Win32_UserAccount" +
                    " WHERE domain = " + app.fun.repair(user.domain) +
                    " AND name = " + app.fun.repair(user.account)
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// ���� �� ��������� �����
                    item = items.item();// �������� ��������� ������� ���������
                    items.moveNext();// ��������� � ���������� ��������
                    if (value = item.sid) user.sid = id = value;
                    // ��������������
                    if (value = app.fun.clear(item.fullName)) data['USR-NAME'] = value;
                    if (value = app.fun.clear(user.sid)) data['USR-SID'] = value;
                    // ��������������� �� ������ ��������
                    break;
                };
                // �������� ��� �������� �������������
                try {// ������� ������������ � ������
                    (function () {// �������� ��� ��������� ����������
                        var service = locator.connectServer(domain, 'root\\CIMV2');
                        // ��������� �������������� ��������� ������������
                        response = service.execQuery(
                            "SELECT fullName, sid" +
                            " FROM Win32_UserAccount" +
                            " WHERE domain = " + app.fun.repair(user.domain) +
                            " AND name = " + app.fun.repair(user.account)
                        );
                        items = new Enumerator(response);
                        while (!items.atEnd()) {// ���� �� ��������� �����
                            item = items.item();// �������� ��������� ������� ���������
                            items.moveNext();// ��������� � ���������� ��������
                            if (value = item.sid) user.sid = id = value;
                            // ��������������
                            if (value = app.fun.clear(item.fullName)) data['USR-NAME'] = value;
                            if (value = app.fun.clear(user.sid)) data['USR-SID'] = value;
                            // ��������������� �� ������ ��������
                            break;
                        };
                    })();
                } catch (e) { };
                // ��������� �������������� ������� ������������
                response = service.execQuery(
                    "SELECT localPath" +
                    " FROM Win32_UserProfile" +
                    " WHERE sid = " + app.fun.repair(user.sid)
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// ���� �� ��������� �����
                    item = items.item();// �������� ��������� ������� ���������
                    items.moveNext();// ��������� � ���������� ��������
                    // ��������������
                    if (value = app.fun.clear(item.localPath)) data['USR-PROFILE'] = value;
                    // ��������������� �� ������ ��������
                    break;
                };
                // ��������� �������������� �������� �����
                response = service.execQuery(
                    "SELECT homeDirectory" +
                    " FROM Win32_NetworkLoginProfile" +
                    " WHERE name = " + app.fun.repair(user.login)
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// ���� �� ��������� �����
                    item = items.item();// �������� ��������� ������� ���������
                    items.moveNext();// ��������� � ���������� ��������
                    // ��������������
                    if (value = app.fun.clear(item.homeDirectory)) data['USR-HOME'] = value;
                    // ��������������� �� ������ ��������
                    break;
                };
                // ��������� �������������� ������������ ����������
                score = 0;// �������� ������� ������
                id = '';// ���������� ������������� ��������
                response = service.execQuery(
                    "SELECT architecture, maxClockSpeed, name, revision, numberOfCores, socketDesignation" +
                    " FROM Win32_Processor" +
                    " WHERE role = 'CPU'"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// ���� �� ��������� �����
                    item = items.item();// �������� ��������� ������� ���������
                    items.moveNext();// ��������� � ���������� ��������
                    // ��������������
                    if (0 == item.architecture) data['CPU-ARCHITECTURE'] = 'x86';
                    else if (9 == item.architecture) data['CPU-ARCHITECTURE'] = 'x64';
                    if (value = item.maxClockSpeed) data['CPU-SPEED'] = app.fun.info2str(value * 1000 * 1000, 2, 1000) + '��';
                    if (value = item.maxClockSpeed) data['CPU-SPEED-VAL'] = value * 1000 * 1000;
                    if (value = app.fun.clear(item.name, 'CPU', 'APU', '���������', 'Processor', 'with', 'Radeon HD Graphics')) data['CPU-NAME'] = value;
                    if (value = app.fun.clear(item.revision)) data['CPU-VERSION'] = value;
                    if (value = item.numberOfCores) data['CPU-CORE'] = value;
                    if (value = app.fun.clear(item.socketDesignation, 'SOCKET 0')) data['CPU-SOCKET'] = value;
                    // �������� ������� ������������������
                    if (value = item.maxClockSpeed) score += 2.26143 * Math.sqrt(value / 1000);
                    if (value = item.numberOfCores) score *= 1.02033 * Math.sqrt(value);
                    // ��������������� �� ������ ��������
                    break;
                };
                if (score) benchmark = benchmark ? Math.min(benchmark, score) : score;
                // ��������� �������������� ���� ����������
                id = '';// ���������� ������������� ��������
                response = service.execQuery(
                    "SELECT level, maxCacheSize" +
                    " FROM Win32_CacheMemory"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// ���� �� ��������� �����
                    item = items.item();// �������� ��������� ������� ���������
                    items.moveNext();// ��������� � ���������� ��������
                    // ��������������
                    if (value = item.maxCacheSize) data['CPU-CACHE-L' + (item.level - 2)] = app.fun.info2str(value * 1024, 0) + '�';
                };
                // ��������� �������������� ����������� ������
                score = 0;// �������� ������� ������
                total = 0;// �������� �������� ��� ������������
                id = '';// ���������� ������������� ��������
                response = service.execQuery(
                    "SELECT capacity, speed" +
                    " FROM Win32_PhysicalMemory"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// ���� �� ��������� �����
                    item = items.item();// �������� ��������� ������� ���������
                    items.moveNext();// ��������� � ���������� ��������
                    // ��������������
                    if (value = item.capacity) data['RAM-SIZE-VAL'] = total += 1 * value;
                    if (value = item.capacity) data['RAM-SIZE'] = app.fun.info2str(total, 0) + '�';
                    if (value = item.speed) data['RAM-SPEED'] = value + ' ���';
                    if (value = item.speed) data['RAM-SPEED-VAL'] = value * 1000 * 1000;
                    // �������� ������� ������������������
                    if (value = total) score = 2.51143 * Math.sqrt(value / 1024 / 1024 / 1024);
                    if (value = item.speed) score *= 0.92245 * Math.sqrt(value / 1000);
                };
                if (score) benchmark = benchmark ? Math.min(benchmark, score) : score;
                // ��������� �������������� ������������ ����������
                id = '';// ���������� ������������� ��������
                response = service.execQuery(
                    "SELECT adapterRam, name, driverVersion, currentHorizontalResolution, currentRefreshRate, currentBitsPerPixel, currentVerticalResolution" +
                    " FROM Win32_VideoController"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// ���� �� ��������� �����
                    item = items.item();// �������� ��������� ������� ���������
                    items.moveNext();// ��������� � ���������� ��������
                    // ��������������
                    if (value = item.adapterRam) data['GPU-SIZE'] = app.fun.info2str(Math.abs(value), 0) + '�';
                    if (value = item.adapterRam) data['GPU-SIZE-VAL'] = Math.abs(value);
                    if (value = app.fun.clear(item.name, 'GPU', '���������������', 'Family', 'Chipset', 'Series', 'Graphics')) data['GPU-NAME'] = value;
                    if (value = app.fun.clear(item.driverVersion)) data['GPU-VERSION'] = value;
                    if (item.currentHorizontalResolution && item.currentVerticalResolution) data['GPU-RESOLUTION'] = item.currentHorizontalResolution + ' x ' + item.currentVerticalResolution;
                    if (value = item.currentHorizontalResolution) data['GPU-RESOLUTION-X'] = value;
                    if (value = item.currentVerticalResolution) data['GPU-RESOLUTION-Y'] = value;
                    if (value = item.currentRefreshRate) data['GPU-FREQUENCY'] = app.fun.info2str(value, 0, 1000) + '��';
                    if (value = item.currentRefreshRate) data['GPU-FREQUENCY-VAL'] = value;
                    if (value = item.currentBitsPerPixel) data['GPU-COLOR'] = app.fun.info2str(value, 0) + '���' + app.lib.numDeclin(value, '', '', '�');
                    if (value = item.currentBitsPerPixel) data['GPU-COLOR-VAL'] = value;
                    // ��������������� �� ������ ��������
                    break;
                };
                // ��������� �������� ����������
                score = 0;// �������� ������� ������
                id = '';// ���������� ������������� ��������
                response = service.execQuery(
                    "SELECT *" +
                    " FROM Win32_DiskDrive"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// ���� �� ��������� �����
                    item = items.item();// �������� ��������� ������� ���������
                    items.moveNext();// ��������� � ���������� ��������
                    // ���������� ��� ��������
                    switch (item.mediaType) {// �������������� ����
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
                    // ���������� ���������� � ������������� ���� ��������
                    if (item.caption && -1 != item.caption.indexOf('Raid')) continue;
                    if (!key || data[key + '-NAME']) continue;
                    // ��������������
                    if (value = app.fun.clear(item.caption, 'ATA Device', 'SCSI Disk Device', 'USB Device', 'SSD')) data[key + '-NAME'] = value;
                    if (value = app.fun.clear(item.firmwareRevision)) data[key + '-VERSION'] = value;
                    if (value = app.fun.clear(item.interfaceType)) data[key + '-TYPE'] = value;
                    if (value = app.fun.clear(item.serialNumber)) data[key + '-SERIAL'] = value;
                    if (value = item.size) data[key + '-SIZE'] = app.fun.info2str(value, 0) + '�';
                    if (value = item.size) data[key + '-SIZE-VAL'] = value;
                    // �������� ������� ������������������
                    if (value = key) score = Math.max(score, 'SDD' == value ? 15.51143 : 7.14577);
                };
                if (score) benchmark = benchmark ? Math.min(benchmark, score) : score;
                // ��������� ���������� ����������
                id = '';// ���������� ������������� ��������
                response = service.execQuery(
                    "SELECT mediaType, caption, drive" +
                    " FROM Win32_CDROMDrive"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// ���� �� ��������� �����
                    item = items.item();// �������� ��������� ������� ���������
                    items.moveNext();// ��������� � ���������� ��������
                    if (item.caption && -1 != item.caption.indexOf('Alcohol')) continue;
                    if (item.caption && -1 != item.caption.indexOf('Virtual')) continue;
                    // ���������� ��� ��������
                    switch (item.mediaType) {// �������������� ����
                        case 'CD-ROM': data['ROM-TYPE'] = 'CD'; break;
                        case 'DVD-ROM': data['ROM-TYPE'] = 'DVD'; break;
                        case 'CD Writer': data['ROM-TYPE'] = 'CD-RW'; break;
                        case 'DVD Writer': data['ROM-TYPE'] = 'DVD-RW'; break;
                    };
                    // ��������������
                    if (value = app.fun.clear(item.caption, 'ATA Device', 'SCSI CdRom Device')) data['ROM-NAME'] = value;
                    if (value = app.fun.clear(item.drive)) data['ROM-DRIVE'] = value;
                    // ��������������� �� ������ ��������
                    break;
                };
                // ��������� ����� ����� ��� ��������� �����
                id = '';// ���������� ������������� ��������
                response = service.execQuery(
                    "SELECT caption, size" +
                    " FROM Win32_LogicalDisk" +
                    " WHERE driveType = 2 OR driveType = 3 OR driveType = 4"
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// ���� �� ��������� �����
                    item = items.item();// �������� ��������� ������� ���������
                    items.moveNext();// ��������� � ���������� ��������
                    if (item.caption && -1 != item.caption.indexOf(drive) || data['BAK-DRIVE']) continue;
                    // ��������������
                    if (value = app.fun.clear(item.caption)) if (item.size >= app.val.driveMinSize) data['BAK-DRIVE'] = value;
                };
                // ���� �������� ����� ��������� eFarma
                id = '';// ���������� ������������� ��������
                key = 'DisplayIcon';// ���� ��� ��������
                list = [// ������ ����� ��� ��������
                    'SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\F3 TAIL',
                    'SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\F3 TAIL',
                    'SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\������',
                    'SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\������'
                ];
                value = '';// ���������� �������� ����������
                method = registry.methods_.item('getStringValue');
                for (var i = 0, iLen = list.length; i < iLen && !value; i++) {
                    param = method.inParameters.spawnInstance_();
                    param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
                    param.sSubKeyName = list[i];
                    param.sValueName = key;
                    item = registry.execMethod_(method.name, param);
                    if (!item.returnValue && item.sValue) value = app.fun.clear(item.sValue);
                };
                if (value) {// ���� ������� �������� ��������
                    list = value.split(delim);
                    list.pop();// ������� ��������� �������
                    list.pop();// ������� ��������� �������
                    // ��������������
                    id = list.join(delim);
                    data['APP-EFARMA-DIR'] = id;
                };
                // ���� ���� �� ������� eFarma
                path = '';// ���������� ��������
                key = '\\Client\\ePlus.Client.exe';
                list = [// ������ ����� ��� ��������
                    id
                ];
                value = '';// ���������� �������� ��� �������
                for (var i = 0, iLen = list.length; i < iLen; i++) {
                    if (i) value += ' OR ';// ��������� �����������
                    value += 'name = ' + app.fun.repair(list[i] + key);
                };
                response = service.execQuery(
                    "SELECT name" +
                    " FROM CIM_DataFile" +
                    " WHERE " + value
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// ���� �� ��������� �����
                    item = items.item();// �������� ��������� ������� ���������
                    items.moveNext();// ��������� � ���������� ��������
                    for (var i = 0, iLen = list.length; i < iLen; i++) {
                        value = list[i] + key;// �������� ��������
                        if (item.name && item.name.toLowerCase() == value.toLowerCase()) {
                            // ��������������
                            data['APP-EFARMA-CLIENT'] = path = value;
                            // ��������������� �� ������ ��������
                            break;
                        };
                    };
                };
                // �������� ������ �� ����� �������� ������� eFarma
                if (path) {// ���� ������ ����
                    key = 'ConnectionString';// �������� ������� ���� � �������
                    value = path + '.Config';// ������ ��������� ���� �� �����
                    if (context) value = [delim, context, value.replace(':', '$')].join(delim);
                    if (fso.fileExists(value) && xml.load(value)) {// ���� ���� ������� ��������
                        items = xml.getElementsByTagName('appSettings');// ������ ���������
                        for (var i = 0, iLen = items.length; i < iLen; i++) {// ����������� �� ���������
                            for (var j = 0, jLen = items.item(i).childNodes.length; j < jLen; j++) {
                                item = items.item(i).childNodes.item(j);// �������� ��������� �������� �������
                                if (1 == item.nodeType && key == item.getAttribute('key')) {// ���� ������ �����������
                                    value = item.getAttribute('value');// �������� �������� ������ �����������
                                    item = app.lib.str2obj(value, false, ';', '=');// ����������� � ������
                                    // ��������������
                                    if (value = item['Data Source']) data['APP-EFARMA-CLIENT-SERVER'] = value;
                                    if (value = item['Initial Catalog']) data['APP-EFARMA-CLIENT-BASE'] = value;
                                    if (value = item['User ID']) data['APP-EFARMA-CLIENT-LOGIN'] = value;
                                    if (value = item['Password']) data['APP-EFARMA-CLIENT-PASSWORD'] = value;
                                    // ��������������� �� ������ ��������
                                    break;
                                };
                            };
                        };
                    };
                };
                // ���� ���� �� ����� eFarma
                path = '';// ���������� ��������
                key = '\\ARM\\ePlus.ARMCasherNew.exe';
                list = [// ������ ����� ��� ��������
                    id
                ];
                value = '';// ���������� �������� ��� �������
                for (var i = 0, iLen = list.length; i < iLen; i++) {
                    if (i) value += ' OR ';// ��������� �����������
                    value += 'name = ' + app.fun.repair(list[i] + key);
                };
                response = service.execQuery(
                    "SELECT name" +
                    " FROM CIM_DataFile" +
                    " WHERE " + value
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// ���� �� ��������� �����
                    item = items.item();// �������� ��������� ������� ���������
                    items.moveNext();// ��������� � ���������� ��������
                    for (var i = 0, iLen = list.length; i < iLen; i++) {
                        value = list[i] + key;// �������� ��������
                        if (item.name && item.name.toLowerCase() == value.toLowerCase()) {
                            // ��������������
                            data['APP-EFARMA-CASHER'] = path = value;
                            // ��������������� �� ������ ��������
                            break;
                        };
                    };
                };
                // �������� ������ �� ����� �������� ����� eFarma
                if (path) {// ���� ������ ����
                    key = 'LocalConnectionString';// �������� ������� ���� � �������
                    value = path + '.Config';// ������ ��������� ���� �� �����
                    if (context) value = [delim, context, value.replace(':', '$')].join(delim);
                    if (fso.fileExists(value) && xml.load(value)) {// ���� ���� ������� ��������
                        items = xml.getElementsByTagName('appSettings');// ������ ���������
                        for (var i = 0, iLen = items.length; i < iLen; i++) {// ����������� �� ���������
                            for (var j = 0, jLen = items.item(i).childNodes.length; j < jLen; j++) {
                                item = items.item(i).childNodes.item(j);// �������� ��������� �������� �������
                                if (1 == item.nodeType && key == item.getAttribute('key')) {// ���� ������ �����������
                                    value = item.getAttribute('value');// �������� �������� ������ �����������
                                    item = app.lib.str2obj(value, false, ';', '=');// ����������� � ������
                                    // ��������������
                                    if (value = item['Data Source']) data['APP-EFARMA-CASHER-SERVER'] = value;
                                    if (value = item['Initial Catalog']) data['APP-EFARMA-CASHER-BASE'] = value;
                                    if (value = item['User ID']) data['APP-EFARMA-CASHER-LOGIN'] = value;
                                    if (value = item['Password']) data['APP-EFARMA-CASHER-PASSWORD'] = value;
                                    // ��������������� �� ������ ��������
                                    break;
                                };
                            };
                        };
                    };
                };
                // ���� ���� �� ������� ���������� eFarma
                path = '';// ���������� ��������
                key = '\\UpdateServer\\ePlus.UpdateServer.exe';
                list = [// ������ ����� ��� ��������
                    id
                ];
                value = '';// ���������� �������� ��� �������
                for (var i = 0, iLen = list.length; i < iLen; i++) {
                    if (i) value += ' OR ';// ��������� �����������
                    value += 'name = ' + app.fun.repair(list[i] + key);
                };
                response = service.execQuery(
                    "SELECT name" +
                    " FROM CIM_DataFile" +
                    " WHERE " + value
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// ���� �� ��������� �����
                    item = items.item();// �������� ��������� ������� ���������
                    items.moveNext();// ��������� � ���������� ��������
                    for (var i = 0, iLen = list.length; i < iLen; i++) {
                        value = list[i] + key;// �������� ��������
                        if (item.name && item.name.toLowerCase() == value.toLowerCase()) {
                            // ��������������
                            data['APP-EFARMA-UPDATER'] = path = value;
                            // ��������������� �� ������ ��������
                            break;
                        };
                    };
                };
                // �������� ������ �� ����� �������� ������� ���������� eFarma
                if (path) {// ���� ������ ����
                    value = path + '.Config';// ������ ��������� ���� �� �����
                    if (context) value = [delim, context, value.replace(':', '$')].join(delim);
                    if (fso.fileExists(value) && xml.load(value)) {// ���� ���� ������� ��������
                        items = xml.getElementsByTagName('appSettings');// ������ ���������
                        for (var i = 0, iLen = items.length; i < iLen; i++) {// ����������� �� ���������
                            for (var j = 0, jLen = items.item(i).childNodes.length; j < jLen; j++) {
                                item = items.item(i).childNodes.item(j);// �������� ��������� �������� �������
                                if (1 == item.nodeType) {// ���� ��� ��� � �������
                                    value = item.getAttribute('value');// �������� ��������
                                    switch (item.getAttribute('key')) {// �������������� �������� ��������
                                        case 'LocalUrl': if (value) data['APP-EFARMA-UPDATE-DIR'] = value; break;
                                        case 'BackupDbFolder': if (value) data['APP-EFARMA-BACKUP-DIR'] = value; break;
                                    };
                                };
                            };
                        };
                    };
                };
                // ���� ���� �� ����� �������� eFarma
                key = 'lic';
                list = [// ������ ����� ��� ��������
                    id + '\\UpdateServer\\',
                    id + '\\Client\\',
                    id + '\\ARM\\'
                ];
                value = '';// ���������� �������� ��� �������
                for (var i = 0, iLen = list.length; i < iLen; i++) {
                    if (i) value += ' OR ';// ��������� �����������
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
                while (!items.atEnd()) {// ���� �� ��������� �����
                    item = items.item();// �������� ��������� ������� ���������
                    items.moveNext();// ��������� � ���������� ��������
                    for (var i = 0, iLen = list.length; i < iLen; i++) {
                        value = list[i] + item.fileName + '.' + key;// �������� ��������
                        if (item.name && item.name.toLowerCase() == value.toLowerCase()) {
                            // ��������������
                            data['APP-EFARMA-LICENSE'] = value;
                            // ��������������� �� ������ ��������
                            break;
                        };
                    };
                };
                // ���� �������� ����� ��������� ����
                id = '';// ���������� ������������� ��������
                value = app.lib.date2str(time, 'Y');
                key = '\\ULUS.exe';
                list = [// ������ ����� ��� ��������
                    'C:\\SoftLink\\Ulus\\' + value,
                    'C:\\LO\\ULUS\\' + value,
                    'C:\\so\\Ulus\\' + value,
                    'C:\\ULUS\\' + value
                ];
                value = '';// ���������� �������� ��� �������
                for (var i = 0, iLen = list.length; i < iLen; i++) {
                    if (i) value += ' OR ';// ��������� �����������
                    value += 'name = ' + app.fun.repair(list[i] + key);
                };
                response = service.execQuery(
                    "SELECT name" +
                    " FROM CIM_DataFile" +
                    " WHERE " + value
                );
                items = new Enumerator(response);
                while (!items.atEnd()) {// ���� �� ��������� �����
                    item = items.item();// �������� ��������� ������� ���������
                    items.moveNext();// ��������� � ���������� ��������
                    for (var i = 0, iLen = list.length; i < iLen; i++) {
                        value = list[i] + key;// �������� ��������
                        if (item.name && item.name.toLowerCase() == value.toLowerCase()) {
                            // ��������������
                            data['APP-ULUS'] = value;
                            data['APP-ULUS-DIR'] = list[i];
                            // ��������������� �� ������ ��������
                            break;
                        };
                    };
                };
                // ���� �������� ����� ��������� Chrome
                id = '';// ���������� ������������� ��������
                key = '';// ���� ��� ��������
                list = [// ������ ����� ��� ��������
                    'SOFTWARE\\Clients\\StartMenuInternet\\Google Chrome\\shell\\open\\command',
                    'SOFTWARE\\WOW6432Node\\Clients\\StartMenuInternet\\Google Chrome\\shell\\open\\command'
                ];
                value = '';// ���������� �������� ����������
                method = registry.methods_.item('getStringValue');
                for (var i = 0, iLen = list.length; i < iLen && !value; i++) {
                    param = method.inParameters.spawnInstance_();
                    param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
                    param.sSubKeyName = list[i];
                    param.sValueName = key;
                    item = registry.execMethod_(method.name, param);
                    if (!item.returnValue && item.sValue) value = app.fun.clear(item.sValue);
                };
                if (value) {// ���� ������� �������� ��������
                    list = value.split(delim);
                    list.pop();// ������� ��������� �������
                    // ��������������
                    data['APP-CHROME'] = value;
                    data['APP-CHROME-DIR'] = list.join(delim);
                };
                // ���� �������� ����� ��������� VLC
                id = '';// ���������� ������������� ��������
                key = '';// ���� ��� ��������
                list = [// ������ ����� ��� ��������
                    'SOFTWARE\\VideoLAN\\VLC',
                    'SOFTWARE\\WOW6432Node\\VideoLAN\\VLC'
                ];
                value = '';// ���������� �������� ����������
                method = registry.methods_.item('getStringValue');
                for (var i = 0, iLen = list.length; i < iLen && !value; i++) {
                    param = method.inParameters.spawnInstance_();
                    param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
                    param.sSubKeyName = list[i];
                    param.sValueName = key;
                    item = registry.execMethod_(method.name, param);
                    if (!item.returnValue && item.sValue) value = app.fun.clear(item.sValue);
                };
                if (value) {// ���� ������� �������� ��������
                    list = value.split(delim);
                    list.pop();// ������� ��������� �������
                    // ��������������
                    data['APP-VLC'] = value;
                    data['APP-VLC-DIR'] = list.join(delim);
                };
                // ��������� ������������� TeamViewer
                id = '';// ���������� ������������� ��������
                key = 'ClientID';// ���� ��� ��������
                list = [// ������ ����� ��� ��������
                    'SOFTWARE\\TeamViewer',
                    'SOFTWARE\\WOW6432Node\\TeamViewer'
                ];
                value = '';// ���������� �������� ����������
                method = registry.methods_.item('getDWORDValue');
                for (var i = 0, iLen = list.length; i < iLen && !value; i++) {
                    param = method.inParameters.spawnInstance_();
                    param.hDefKey = 0x80000002;// HKEY_LOCAL_MACHINE
                    param.sSubKeyName = list[i];
                    param.sValueName = key;
                    item = registry.execMethod_(method.name, param);
                    if (!item.returnValue && item.uValue) value = app.fun.clear(item.uValue);
                };
                if (value) {// ���� ������� �������� ��������
                    // ��������������
                    data['APP-TEAMVIEWER-ID'] = value;
                };
                // ��������� ����� ��������� ������
                value = host.toLowerCase();
                if (0 == value.indexOf(app.val.aptPref)) {// ���� ��� ��������� � ������
                    value = value.substr(app.val.aptPref.length, app.val.aptLen);
                    if (!isNaN(value)) {// ���� ������� �������� ����� ������
                        data['APT-NUMBER'] = value || app.val.aptNone;
                        data['APT-NUMBER-VAL'] = Number(value);
                    };
                };
                // ��������� ����� ���������� � �������� ������
                value = host.toLowerCase();
                if (0 == value.indexOf(app.val.aptPref)) {// ���� ��� ��������� � ������
                    value = value.substr(app.val.aptPref.length + app.val.aptLen);
                    if (value) {// ���� ��� �� �������� ��������� � �������� ������
                        if (0 == value.indexOf(app.val.wsPref)) {// ���� ��� �������������� ���������
                            value = value.substr(app.val.wsPref.length, app.val.wsLen);
                            if (!isNaN(value)) {// ���� ������� �������� ����� ����������
                                value = Number(value);
                            } else value = 0;
                        } else value = 0;
                    } else value = 1;
                    data['APT-COMPUTER-VAL'] = value;
                    if (0 == value) data['APT-COMPUTER'] = app.val.wsNoneDesc;
                    else if (1 == value) data['APT-COMPUTER'] = app.val.wsFirstDesc;
                    else data['APT-COMPUTER'] = app.val.wsNextDesc;
                };
                // ��������� ��������� ����������� ���������
                value = host.toLowerCase();
                if (0 == value.indexOf(app.val.aptPref)) {// ���� ��� ��������� � ������
                    value = value.substr(app.val.aptPref.length, app.val.aptLen);
                    if (!isNaN(value)) {// ���� ������� �������� ����� ������
                        list = [app.val.supportLogin, Number(value), app.val.supportToken];
                        data['APT-SUPPORT-HASH'] = app.lib.md5(list.join(''));
                        data['APT-SUPPORT-LOGIN'] = app.val.supportLogin;
                    };
                };
                // ��������� �������� �������� ����������
                list = [];// ������� �������� ����������
                if (data['CPU-NAME'] && data['CPU-CORE'] && data['CPU-SPEED']) list.push(app.fun.clear(data['CPU-NAME'].replace('Dual-Core', 'Intel'), 'Dual Core', 'Xeon', 'Pentium', 'Celeron', 'Core2 Duo', 'Core', 'Processor', 'Athlon 64', 'Athlon', /,.+/, /@.+/, /\d\.d+GHz/) + ' ' + data['CPU-CORE'] + 'x' + data['CPU-SPEED'].replace(',', '.').replace(' ���', 'M').replace(' ���', 'G') + 'Hz');
                if (data['RAM-SIZE'] && data['RAM-SPEED']) list.push(data['RAM-SIZE'].replace(' ��', 'MB').replace(' ��', 'GB') + ' ' + data['RAM-SPEED'].replace(' ���', 'M').replace(' ���', 'G') + 'Hz');
                if (data['GPU-SIZE'] && data['GPU-NAME'] && (-1 != data['GPU-NAME'].indexOf('GeForce') || -1 != data['GPU-NAME'].indexOf('Radeon'))) list.push(data['GPU-SIZE'].replace(' ��', 'MB').replace(' ��', 'GB') + ' ' + app.fun.clear(data['GPU-NAME'], 'AMD', 'NVIDIA', 'GeForce', 'Radeon', /\(.+/));
                if (data['HDD-SIZE']) list.push(data['HDD-SIZE'].replace(' ��', 'MB').replace(' ��', 'GB').replace(' ��', 'TB') + ' HDD');
                if (data['SSD-SIZE']) list.push(data['SSD-SIZE'].replace(' ��', 'MB').replace(' ��', 'GB').replace(' ��', 'TB') + ' SSD');
                if (data['USB-SIZE']) list.push(data['USB-SIZE'].replace(' ��', 'MB').replace(' ��', 'GB').replace(' ��', 'TB') + ' USB');
                if (data['ROM-TYPE']) list.push(data['ROM-TYPE']);
                if (list.length) data['DEV-NAME'] = list.join('/');
                // ��������� �������� ������ ������������������
                if (benchmark) data['DEV-BENCHMARK'] = app.lib.num2str(benchmark, 5, ',', '');
            };
            // ��������� ����� ���������� �� ��������� ���������
            items = shell.environment(app.val.envType);
            for (var key in data) {// ����������� �� ������ � �������
                value = data[key];// �������� ��������� ��������
                setEnv(items, key, value);
            };
            // ������� ��������� ������ ��� ������
            items = [];// ���������� ������ ����������
            for (var i = 0, iLen = wsh.arguments.length - index; i < iLen; i++) {
                value = wsh.arguments.item(i + index);// �������� ��������� �������� ����������
                value = value.split(app.val.getDelim).join(app.val.setDelim);
                // �������� �� ��������� ���������
                if (!i && 'silent' == value) app.val.runStyle = 0;
                else if (!i && 'print' == value) wsh.echo(app.lib.obj2str(data, false, '\r\n', ' = '));
                else if (!i && 'csv' == value) {// ���� ���������� ���������
                    list = [// ������ ��������� ������
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
                        key = list[j];// �������� ��������� ����
                        list[j] = data[key] ? data[key] : '';
                    };
                    wsh.echo(list.join(app.val.csvDelim));
                } else {// ���� ��� �� ��������� ��������
                    value = shell.expandEnvironmentStrings(value);
                    if (-1 != value.indexOf(app.val.argDelim)) {// ���� ���� �����������
                        value = app.val.argWrap + value + app.val.argWrap;
                    };
                    items.push(value);
                };
            };
            command = items.join(app.val.argDelim);
            // �������� ��������� ������
            try {// ������� ��������� �������
                if (command) value = shell.run(command, app.val.runStyle, true);
                else value = app.val.defReturn;
            } catch (e) {// ��� ������������� ������
                value = app.val.defReturn;
            };
            // ��������� �������� �����
            wsh.quit(value);
        }
    });
})(WSH, env);
// ��������� �������������
env.init();