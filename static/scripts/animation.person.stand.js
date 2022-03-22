var animation = function (personList, element) {

    function addPerson(donorId, avatar, note, created) {
        var showNote = note;
        if (showNote.length > 150) showNote = showNote.substr(0, 150) + '...';

        donorId += '-' + Date.now();

        // element.append('<div class="person-wrapper"><div class="person person-' + donorId + '">' +
        //     '<div class="person-content">' +
        //     '<div class="person-body"> ' + avatar + '</div>' +
        //     '<div class="message message-right"><div class="message-cursor"></div><div class="message-box"><blockquote class="groucho">' + (showNote == ''?'💞': showNote) + '</blockquote><footer class="message-created">' + (created == ''?'ไม่ได้ระบุ': created) + '</footer></div></div>' +
        //     '</div></div>')


        element.append('<div class="person-wrapper"><div class="donorList-wrapper" person-' + donorId + '">' +
            '<div class="donorList-list">' +
            '<div class="avatar-wrapper"> ' + avatar + '</div>' +
            '<div class="message message-list"><div class="message-cursor"></div><div class="message-box"><blockquote class="groucho">' + (showNote == ''?'💞': showNote) + '</blockquote><footer class="message-created">' + (created == ''?'ไม่ได้ระบุ': created) + '</footer></div></div>' +
            '</div></div>')


        var messageAnimations = [
            {
                name: 'message' + donorId,
                '0%': {'visibility': 'hidden'},
                '49.9%': {'visibility': 'visible'},
                '50%': {'visibility': 'hidden'},
                '99.9%': {'visibility': 'hidden'},
                '100%': {'visibility': 'hidden'},
            },

            {
                name: 'message' + donorId,
                '0%': {'visibility': 'hidden'},
                '49.9%': {'visibility': 'visible'},
                '50%': {'visibility': 'hidden'},
                '99.9%': {'visibility': 'hidden'},
                '100%': {'visibility': 'hidden'},
            },
        ];

        var random = Math.floor(Math.random() * messageAnimations.length);
        var messageAnimation = messageAnimations[random];

        // $.keyframe.define([messageAnimation]);

        var durations = ['5.0s', '10.0s'];

        var random = Math.floor(Math.random() * durations.length);
        var duration = durations[random];

        $('.person-' + donorId + ' .message').playKeyframe({
            name: 'message' + donorId,
            timingFunction: 'linear',
            iterationCount: 'infinite',
            delay: '0s',
            duration: duration
        });

    }

    var delayShow = 10000;
    var delayHide = delayShow - 500;

    var delayLoop = ((delayShow) * (personList.length)) + 500;

    function refreshAnimation(donorId, avatar, note, element) {

        addPerson(donorId, avatar, note, element);

        if (!isSolo) {
            setTimeout(function () {
                $('.donorList-wrapper:first').fadeOut(500);
                setTimeout(function () {
                    $('.donorList-wrapper:first').remove();
                }, 500);
            }, delayHide);
        }

    }

    function runLoop(i) {
        setTimeout(function () {
            var person = personList[i];
            refreshAnimation(person[0], person[1], person[2],  person[3]);
            // console.log(i, person);

            i++;

            if (i < personList.length) {
                runLoop(i);
            }
        }, i == 0? 0: delayShow);

    }

    var isSolo = personList.length == 1;

    if (!isSolo) {
        setInterval(function () {
            runLoop(0);
        }, delayLoop + 100);

    }
    runLoop(0);

};