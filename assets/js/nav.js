$().ready(function() {

	var nav = $('.nav')[0];

	$.fn.extend({
		openNavElement: function() {
			$('.sub-nav-form').trigger("reset");

			if ($(this).is('.btn-add')) {
				openAdd($(this));
			} else if ($(this).is('.nav-container label')) {
				openContainer($(this).parent());
			} else if ($(this).is('.nav-container-options-item')) {
				openItem($(this));
			}
		},
		closeSubNav: function(callback) {
			$('.sub-nav').animate({left: '-' + ($('.sub-nav').width() + 10) + 'px'}, 300);
			$('.nav-container-options-item--active').removeClass('nav-container-options-item--active');

			$('.sub-nav-form select').trigger("change");
			callback();
		}
	});

	function openAdd(button) {
		// new map/account
		$('.sub-nav').find('input[name="new"]').val(1);
		$('.sub-nav .non-editable-input').prop("disabled", false);
		$(".sub-nav .hidden-edit-input").show();
		$('.nav-container-options-item--active').removeClass('nav-container-options-item--active');

		if (!button.parent().hasClass('nav-container--active')) {
			$('.nav-container--active .nav-container-options').slideUp(300);
			$('.nav-container--active').removeClass('nav-container--active');
			button.parent().find('.nav-container-options').slideDown(300);
			button.parent().addClass('nav-container--active');
		}

		if (button.hasClass('bouncy')) {
			button.removeClass('bouncy');
		}

		if (button.parents('.nav-container-maps').length) {
			$('#map-accounts').empty();
			// get accounts
			$('.nav-container-accounts .nav-container-options-item').each(function(k, v) {
				var row = $(" \
					<tr> \
						<td><input type='checkbox' name=\"accounts[" + $(this).data('id') + "]\" /></td> \
						<td>" + $(this).html() + "</td> \
					</tr> \
				");
				$('#map-accounts').append(row);
			});
		}

		$('.sub-nav-header').html(button.data('name'));
		$('.sub-nav-form').hide();
		$('.sub-nav-form-' + button.data('target')).show();
		$('.sub-nav').animate({left: '0px'}, 300);
	}

	// Main header
	function openContainer(container) {
		if (container.hasClass('nav-container--active')) {
			container.find('.nav-container-options').slideUp(300);
			container.removeClass('nav-container--active');
		} else {
			$('.nav-container--active .nav-container-options').slideUp(300);
			$('.nav-container--active').removeClass('nav-container--active');
			container.find('.nav-container-options').slideDown(300);
			container.addClass('nav-container--active');
		}

		// reset subnav
		$('.sub-nav').animate({left: '-' + ($('.sub-nav').width() + 10) + 'px'}, 300);
		$('.nav-container-options-item--active').removeClass('nav-container-options-item--active');
	}

	// Map/Account item
	function openItem(item) {
		// not new map/account
		$('.sub-nav').find('input[name="new"]').val(0);
		$('.sub-nav .non-editable-input').prop("disabled", true);
		$(".sub-nav .hidden-edit-input").hide();

		if (item.hasClass('nav-container-options-item--active')) {
			$('.sub-nav').animate({left: '-' + ($('.sub-nav').width() + 10) + 'px'}, 300);
			item.removeClass('nav-container-options-item--active');
			return;
		}

		$('.sub-nav').animate({left: '0px'}, 300);
		$('.nav-container-options-item--active').removeClass('nav-container-options-item--active');
		item.addClass('nav-container-options-item--active');

		$.each($.parseJSON(item.attr('data-fields')), function(input, value) {
			$('.sub-nav #' + input).val(value);
		});

		if (item.parents('.nav-container-accounts').length) {
			$('.sub-nav #type').trigger('change');

			$('.sub-nav-form').hide();
			$('.sub-nav-form-account').show();

		} else if (item.parents('.nav-container-maps').length) {
			$('#map-accounts').empty();
			// get accounts
			$('.nav-container-accounts .nav-container-options-item').each(function(k, v) {
				var row = $(" \
					<tr> \
						<td><input type='checkbox' name=\"account[" + $(this).data('id') + "]\" /></td> \
						<td>" + $(this).html() + "</td> \
					</tr> \
				");
				$('#map-accounts').append(row);
			});

			$('.sub-nav-form').hide();
			$('.sub-nav-form-map').show();
		}
	}
});
