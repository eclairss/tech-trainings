const Enums = require('../utilities/enums');

/**
* can be used by any clickable list of elements i.e. cards, links (if does na have href, will not return anything)
* returns element
*/
let GetLinkByIndex = async(option, links) => {
    let size = await links.length;
    
    if(size>0){
        let index;
        if(typeof option !== 'number'){
            switch (option) {
                case Enums.Options.MAX: 
                    //set index to links size - 1
                    index = size - 1;
                    break;
                case Enums.Options.MIN:
                    //set index to 0
                    index = 0;
                    break;
                case Enums.Options.RANDOM:
                    //set index to random
                    index = NumbersHelper.GetRandomNumber(0,size-1);
                    break;
                default:
                    break;
            }
        } else index = option;

        return links[index];
    }
}

let HasClass = async(element, className) => {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}

let WaitForElement = async(elem, timeout) => {
    var ec = await protractor.ExpectedConditions;
    await browser.wait(ec.visibilityOf(elem), timeout,"Dialog box is displayed.");
}

const NumbersHelper = {
    GetRandomNumber: (min, max) => {
        return Math.floor(Math.random() * (max) + min);
    }
}

const DateTimeHelper = {
    FormatTime: (datetime, locale, format) => {
        return datetime.toLocaleString(locale, { hour: format.hour, minute: format.minute, hour12: format.hour12 });
    },

    FormatDate: (datetime, format) => {
        switch (format) {
            case 'yyyy-mm-dd':
                var tzoffset = (datetime).getTimezoneOffset() * 60000; //offset in milliseconds
                var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
                return localISOTime;
            default:
                throw new Error('Unsupported format');
        }
    },

    GetDate: (daysFromNow) => {
        let date = new Date();
        date.setDate(date.getDate()+daysFromNow);
        return DateTimeHelper.FormatDate(date,'yyyy-mm-dd');
    },

    GetRandomDate: (start, end) => {
        var random = 0;
        var start = start || '1970-01-01';
        var end = end || new Date().toLocaleDateString();
        start = new Date(start).getTime();
        end = new Date(end).getTime();
        if(start<end){
            random = NumbersHelper.GetRandomNumber(start,end);
        } else{
            random = NumbersHelper.GetRandomNumber(end,start);
        }
    
        return DateTimeHelper.FormatDate(new Date(random),'yyyy-mm-dd');
    }
};

module.exports.GetLinkByIndex = GetLinkByIndex;
module.exports.HasClass = HasClass;
module.exports.WaitForElement = WaitForElement;
module.exports.DateTimeHelper = DateTimeHelper;
module.exports.NumbersHelper = NumbersHelper;