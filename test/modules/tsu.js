module.exports = {
  'Tsu.js' : function (browser) {
    browser
      .url('http://localhost:3333/test/fixtures/')
        .click('#success')
        .pause(100)
          .assert.visible('.tsu__box')
          .assert.visible('.tsu__success')
          .assert.containsText('.tsu__label', 'success')
          .assert.containsText('.tsu__message', 'Good')

      .refresh()
        .click('#danger')
        .pause(100)
          .assert.visible('.tsu__danger')
          .assert.containsText('.tsu__label', 'danger')
          .assert.containsText('.tsu__message', 'Woops')

      .refresh()
        .click('#success')
        .click('#success')
        .click('#success')
        .click('#success')
        .pause(400)
          .assert.elementNotPresent('.tsu__success:nth-child(4)')

      .end();
  }
};
