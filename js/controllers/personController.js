angular.module("personApp").controller("personController", function ($scope, $http) {

	$scope.app = "Person Report";
	$scope.personList = [];
	$scope.updateMode = false;

	//GET
	var getAll = function () {
		$http.get("http://geprosaasapi.apphb.com/person/").success(function (data) {
			$scope.personList = data;
		}).error(function (data, status) {
			$scope.message = "Error Occurred: " + data;
		});
	};

	$scope.getById = function (person) {
		$http.get("http://geprosaasapi.apphb.com/person/" + person.Id).success(function (data) {
			$scope.person = data;
			$scope.updateMode = true;
		}).error(function (data, status) {
			$scope.message = "Error Occurred: " + data;
		});
	};

	//POST
	$scope.Add = function (person) {
		person.CreatedAt = new Date();
		person.CreatedBy = 'admin';
		$http.post("http://geprosaasapi.apphb.com/person/", person).success(function (data) {
			clearFields();
			getAll();
		}).error(function (data, status) {
			$scope.message = "Error Occurred: " + data;	
		});
	};

	$scope.Update = function (person) {
		person.UpdatedAt = new Date();
		person.UpdatedBy = 'salesman';
		$http.put("http://geprosaasapi.apphb.com/person/", person).success(function (data) {
			clearFields();
			getAll();
		}).error(function (data, status) {
			$scope.message = "Error Occurred: " + data;
		});
	};

	$scope.CancelUpdate = function () {
		clearFields();
		$scope.updateMode = false;
	};

	$scope.Delete = function (personList) {
		$scope.personList = personList.filter(function (person) {
			if (!person.selecionado) {
				return person;
			} else {
				$http.delete("http://geprosaasapi.apphb.com/person/" + person.Id).success(function (data) {
				}).error(function (data, status) {
					$scope.message = "Error Occurred: " + data;
				});
			}
		});
	};	


//		$scope.contatos = contatos.filter(function (contato) {
//			if (!contato.selecionado) return contato;
//		});
//	};

//	$scope.isChecked = function (person) {
//		return person.some(function (item) {
//			return item.selecionado;
//		});
//	};

	$scope.sortBy = function (field) {
		$scope.criterioDeOrdenacao = field;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	};

	function clearFields() {
		delete $scope.person;
	}

	getAll();
});