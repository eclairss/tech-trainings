const DataProvider = require('../../utilities/dataprovider');
const DateFormat = require('../../utilities/helpers').DateFormat;

const ScheduleDTO = require('../../dto/ScheduleDTO');
const PaymentDTO = require('../../dto/PaymentDTO');
const UserDTO = require('../../dto/UserDTO');
const BranchDTO = require('../../dto/BranchDTO');

var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

console.log(DateFormat.GetDate(new Date(), 'yyyy-mm-dd'));

DataProvider.GetDate(3)

