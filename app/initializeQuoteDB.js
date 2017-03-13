/*
 * Initialize a quotes database
 *
 * Inserts the first five quotes from
 *   _The Pragmatic Programmer_
 * into a local or mLab MongoDB database
 *
 * Problem:  How to end execution without Ctrl-c?
 *
 * Author: Peter Martinson
 * Date:   March 10, 2017
*/
var mongoose = require('mongoose');
var assert   = require('assert');  // node's native unit tester
var dotenv   = require('dotenv');
var config   = require('./config');

// var url      = process.env.MONGOLAB_URI;  // mLab database
// var url      = "mongodb://localhost:27017/pragmatic"; // local database
var url      = "mongodb://" + config.username + ":" + config.password + "@ds123400.mlab.com:23400/quotes"; // local database

mongoose.Promise = Promise;
mongoose.connect(url);

var quoteSchema = mongoose.Schema({
  quote_id:       Number,
  source:         String,
  source_href:    String,
  quote:          String,
  quote_href:     String,
  subquote:       String,
  subquote_href:  String
});

var Quote = mongoose.model('Quote', quoteSchema);

// empty the database!
Quote.remove({}, function(err) {
  assert.equal(null, err, "There's something wrong... " + err);
  console.log("database emptied.");
});


// list the quotes
var allQuotes = [
  {
    quote    : "Care About Your Craft",
    subquote : "Why spend your life developing software unless you care about doing it well?"
  },
  {
    quote    : "Think! About Your Work",
    subquote : "Turn off the autopilot and take control. Constantly critique and appraise your work."
  },
  {
    quote    : "Provide Options, Don't Make Lame Excuses",
    subquote : "Instead of excuses, provide options. Don't say it can't be done; explain what can be done."
  },
  {
    quote    : "Don't Live with Broken Windows",
    subquote : "Fix bad designs, wrong decisions, and poor code when you see them."
  },
  {
    quote    : "Be a Catalyst for Change",
    subquote : "You can't force change on people. Instead, show them how the future might be and help them participate in creating it."
  },
  {
    quote    : "Remember the Big Picture",
    subquote : "Don't get so engrossed in the details that you forget to check what's happening around you."
  },
  {
    quote    : "Make Quality a Requirements Issue",
    subquote : "Involve your users in determining the project's real quality requirements."
  },
  {
    quote    : "Invest Regularly in Your Knowledge Portfolio",
    subquote : "Make learning a habit."
  },
  {
    quote    : "Critically Analyze What You Read and Hear",
    subquote : "Don't be swayed by vendors, media hype, or dogma. Analyze information in terms of you and your project."
  },
  {
    quote    : "It's Both What You Say and the Way You Say It",
    subquote : "There's no point in having great ideas if you don't communicate them effectively."
  },
  {
    quote    : "DRY – Don't Repeat Yourself",
    subquote : "Every piece of knowledge must have a single, unambiguous, authoritative representation within a system."
  },
  {
    quote    : "Make It Easy to Reuse",
    subquote : "If it's easy to reuse, people will. Create an environment that supports reuse."
  },
  {
    quote    : "Eliminate Effects Between Unrelated Things",
    subquote : "Design components that are self-contained. independent, and have a single, well-defined purpose."
  },
  {
    quote    : "There Are No Final Decisions",
    subquote : "No decision is cast in stone. Instead, consider each as being written in the sand at the beach, and plan for change."
  },
  {
    quote    : "Use Tracer Bullets to Find the Target",
    subquote : "Tracer bullets let you home in on your target by trying things and seeing how close they land."
  },
  {
    quote    : "Prototype to Learn",
    subquote : "Prototyping is a learning experience. Its value lies not in the code you produce, but in the lessons you learn."
  },
  {
    quote    : "Program Close to the Problem Domain",
    subquote : "Design and code in your user's language."
  },
  {
    quote    : "Estimate to Avoid Surprises",
    subquote : "Estimate before you start. You'll spot potential problems up front."
  },
  {
    quote    : "Iterate the Schedule with the Code",
    subquote : "Use experience you gain as you implement to refine the project time scales."
  },
  {
    quote    : "Keep Knowledge in Plain Text",
    subquote : "Plain text won't become obsolete. It helps leverage your work and simplifies debugging and testing."
  },
  {
    quote    : "Use the Power of Command Shells",
    subquote : "Use the shell when graphical user interfaces don't cut it."
  },
  {
    quote    : "Use a Single Editor Well",
    subquote : "The editor should be an extension of your hand; make sure your editor is configurable, extensible, and programmable."
  },
  {
    quote    : "Always Use Source Code Control",
    subquote : "Source code control is a time machine for your work – you can go back."
  },
  {
    quote    : "Fix the Problem, Not the Blame",
    subquote : "It doesn't really matter whether the bug is your fault or someone else's – it is still your problem, and it still needs to be fixed."
  },
  {
    quote    : "Don't Panic When Debugging",
    subquote : "Take a deep breath and THINK! about what could be causing the bug."
  },
  {
    quote    : "'select' Isn't Broken.",
    subquote : "It is rare to find a bug in the OS or the compiler, or even a third-party product or library. The bug is most likely in the application."
  },
  {
    quote    : "Don't Assume It – Prove It",
    subquote : "Prove your assumptions in the actual environment – with real data and boundary conditions."
  },
  {
    quote    : "Learn a Text Manipulation Language.",
    subquote : "You spend a large part of each day working with text. Why not have the computer do some of it for you?"
  },
  {
    quote    : "Write Code That Writes Code",
    subquote : "Code generators increase your productivity and help avoid duplication."
  },
  {
    quote    : "You Can't Write Perfect Software",
    subquote : "Software can't be perfect. Protect your code and users from the inevitable errors."
  },
  {
    quote    : "Design with Contracts",
    subquote : "Use contracts to document and verify that code does no more and no less than it claims to do."
  },
  {
    quote    : "Crash Early",
    subquote : "A dead program normally does a lot less damage than a crippled one."
  },
  {
    quote    : "Use Assertions to Prevent the Impossible",
    subquote : "Assertions validate your assumptions. Use them to protect your code from an uncertain world."
  },
  {
    quote    : "Use Exceptions for Exceptional Problems",
    subquote : "Exceptions can suffer from all the readability and maintainability problems of classic spaghetti code. Reserve exceptions for exceptional things."
  },
  {
    quote    : "Finish What You Start",
    subquote : "Where possible, the routine or object that allocates a resource should be responsible for deallocating it."
  },
  {
    quote    : "Minimize Coupling Between Modules",
    subquote : "Avoid coupling by writing 'shy' code and applying the Law of Demeter."
  },
  {
    quote    : "Configure, Don't Integrate",
    subquote : "Implement technology choices for an application as configuration options, not through integration or engineering."
  },
  {
    quote    : "Put Abstractions in Code, Details in Metadata",
    subquote : "Program for the general case, and put the specifics outside the compiled code base."
  },
  {
    quote    : "Analyze Workflow to Improve Concurrency",
    subquote : "Exploit concurrency in your user's workflow."
  },
  {
    quote    : "Design Using Services",
    subquote : "Design in terms of services – independent, concurrent objects behind well-defined, consistent interfaces."
  },
  {
    quote    : "Always Design for Concurrency",
    subquote : "Allow for concurrency, and you'll design cleaner interfaces with fewer assumptions."
  },
  {
    quote    : "Separate Views from Models",
    subquote : "Gain flexibility at low cost by designing your application in terms of models and views."
  },
  {
    quote    : "Use Blackboards to Coordinate Workflow",
    subquote : "Use blackboards to coordinate disparate facts and agents, while maintaining independence and isolation among participants."
  },
  {
    quote    : "Don't Program by Coincidence",
    subquote : "Rely only on reliable things. Beware of accidental complexity, and don't confuse a happy coincidence with a purposeful plan."
  },
  {
    quote    : "Estimate the Order of Your Algorithms",
    subquote : "Get a feel for how long things are likely to take before you write code."
  },
  {
    quote    : "Test Your Estimates",
    subquote : "Mathematical analysis of algorithms doesn't tell you everything. Try timing your code in its target environment."
  },
  {
    quote    : "Refactor Early, Refactor Often",
    subquote : "Just as you might weed and rearrange a garden, rewrite, rework, and re-architect code when it needs it. Fix the root of the problem."
  },
  {
    quote    : "Design to Test",
    subquote : "Start thinking about testing before you write a line of code."
  },
  {
    quote    : "Test Your Software, or Your Users Will",
    subquote : "Test ruthlessly. Don't make your users find bugs for you."
  },
  {
    quote    : "Don't Use Wizard Code You Don't Understand",
    subquote : "Wizards can generate reams of code. Make sure you understand all of it before you incorporate it into your project."
  },
  {
    quote    : "Don't Gather Requirements – Dig for Them",
    subquote : "Requirements rarely lie on the surface. They're buried deep beneath layers of assumptions, misconceptions, and politics."
  },
  {
    quote    : "Work With a User to Think Like a User",
    subquote : "It's the best way to gain insight into how the system will really be used."
  },
  {
    quote    : "Abstractions Live Longer than Details",
    subquote : "Invest in the abstraction, not the implementation. Abstractions can survive the barrage of changes from different implementations and new technologies."
  },
  {
    quote    : "Use a Project Glossary",
    subquote : "Create and maintain a single source of all the specific terms and vocabulary for a project."
  },
  {
    quote    : "Don't Think Outside the Box – Find the Box",
    subquote : "When faced with an impossible problem, identify the real constraints. Ask yourself                                                                       : 'Does it have to be done this way? Does it have to be done at all?'"
  },
  {
    quote    : "Start When You're Ready.",
    subquote : "You've been building experience all your life. Don't ignore niggling doubts."
  },
  {
    quote    : "Some Things Are Better Done than Described",
    subquote : "Don't fall into the specification spiral – at some point you need to start coding."
  },
  {
    quote    : "Don't Be a Slave to Formal Methods.",
    subquote : "Don't blindly adopt any technique without putting it into the context of your development practices and capabilities."
  },
  {
    quote    : "Costly Tools Don't Produce Better Designs",
    subquote : "Beware of vendor hype, industry dogma, and the aura of the price tag. Judge tools on their merits."
  },
  {
    quote    : "Organize Teams Around Functionality",
    subquote : "Don't separate designers from coders, testers from data modelers. Build teams the way you build code."
  },
  {
    quote    : "Don't Use Manual Procedures",
    subquote : "A shell script or batch file will execute the same instructions, in the same order, time after time."
  },
  {
    quote    : "Test Early. Test Often. Test Automatically",
    subquote : "Tests that run with every build are much more effective than test plans that sit on a shelf."
  },
  {
    quote    : "Coding Ain't Done 'Til All the Tests Run",
    subquote : "'Nuff said."
  },
  {
    quote    : "Use Saboteurs to Test Your Testing",
    subquote : "Introduce bugs on purpose in a separate copy of the source to verify that testing will catch them."
  },
  {
    quote    : "Test State Coverage, Not Code Coverage",
    subquote : "Identify and test significant program states. Just testing lines of code isn't enough."
  },
  {
    quote    : "Find Bugs Once",
    subquote : "Once a human tester finds a bug, it should be the last time a human tester finds that bug. Automatic tests should check for it from then on."
  },
  {
    quote    : "English is Just a Programming Language",
    subquote : "Write documents as you would write code: honor the DRY principle, use metadata, MVC, automatic generation, and so on."
  },
  {
    quote    : "Build Documentation In, Don't Bolt It On",
    subquote : "Documentation created separately from code is less likely to be correct and up to date."
  },
  {
    quote    : "Gently Exceed Your Users' Expectations",
    subquote : "Come to understand your users' expectations, then deliver just that little bit more."
  },
  {
    quote    : "Sign Your Work",
    subquote : "Craftsmen of an earlier age were proud to sign their work. You should be, too."
  }
];

// Insert the quotes into a complete Model
var allDocuments = [];
allQuotes.forEach(function(element, index) {
  allDocuments[index] = {
    quote_id: index + 1,
    source: "The Pragmatic Programmer",
    source_href:    "",
    quote: element.quote,
    quote_href:     "",
    subquote: element.subquote,
    subquote_href:  ""
  };
});

allDocuments.forEach(function(element) {
  console.log(element);
});

Quote.create(allDocuments, function (err, results) {
  console.log(results);
});










