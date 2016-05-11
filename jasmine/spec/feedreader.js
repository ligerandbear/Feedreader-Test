/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    function feedAndURLTest(i) {
      it(allFeeds[i].name + ' should have a name and a URL', function() {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name).not.toBe('');
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url).not.toBe('');
      });
    }

    for (var i = 0; i < allFeeds.length; i++) {
      feedAndURLTest(i);
    }
  });

  describe('The menu', function() {
    it('should be hidden on page load', function() {
      expect(document.getElementsByTagName("body")[0].className).toContain("menu-hidden");
    });
    it('should toggle when the menu button is clicked', function() {
      var menuIcon = $('.menu-icon-link');
      menuIcon.click();
      expect(document.getElementsByTagName("body")[0].className).not.toContain("menu-hidden");
      menuIcon.click();
      expect(document.getElementsByTagName("body")[0].className).toContain("menu-hidden");
    });

  });

  describe('Initial Entries', function() {
    beforeEach(function(done) {
      loadFeed(0, done);
    });
    it('should be loaded', function() {
      expect(document.getElementsByClassName("entry").length).toBeGreaterThan(0);
    });
  });

  describe('New Feed Selection', function() {
    var initialFeedLoad;
    var changedFeedLoad;
    beforeEach(function(done) {
      loadFeed(0, function(){
		  initialFeedLoad = document.getElementsByClassName("feed")[0].innerHTML;
		  done();
		  loadFeed(3,done);
		  changedFeedLoad = document.getElementsByClassName("feed")[0].innerHTML;
	  });

    });
    it('should change when the content changes', function() {
      expect(initialFeedLoad).not.toEqual(changedFeedLoad);
    });
  });
}());