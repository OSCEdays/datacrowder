'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects',
	function($scope, $stateParams, $location, Authentication, Projects) {
		$scope.authentication = Authentication;
		$scope.questionTypes = ["single choice", "multiple choice", "dropdown", "text"];
		$scope.statusTypes= [{ value: true, name: "Story" }, { value: false, name: "Project" }];
		$scope.questions = [{text: '', type: ''}];

		// Create new Project
		$scope.create = function() {

			// Create new Project object
			var project = new Projects ({
				headline: this.headline,
				description: this.description,
				questions: this.questions
			});

			// Redirect after save
			project.$save(function(response) {
				$location.path('projects/' + response._id);

				// Clear form fields
				$scope.headline = '';
				$scope.description = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Project
		$scope.remove = function(project) {
			if ( project ) { 
				project.$remove();

				for (var i in $scope.projects) {
					if ($scope.projects [i] === project) {
						$scope.projects.splice(i, 1);
					}
				}
			} else {
				$scope.project.$remove(function() {
					$location.path('projects');
				});
			}
		};

		// Update existing Project
		$scope.update = function() {
			var project = $scope.project;

			project.$update(function() {
				$location.path('projects/' + project._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Projects
		$scope.find = function() {
			$scope.projects = Projects.query();
		};

		// Find existing Project
		$scope.findOne = function() {
			$scope.project = Projects.get({ 
				projectId: $stateParams.projectId
			});
		};

		// Add a Question
		$scope.addQuestion = function(project) {
			if ( project.questions.length < 3 )
				project.questions.push({ text : '', type: '' });
		};

		// Remove a Question
		$scope.removeQuestion = function(project, index) {
			project.questions.splice(index, 1);
		};

		// Change type of Question
		$scope.changeType = function(project, index) {

		};
	}
]);