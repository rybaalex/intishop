import { TranslationMessages } from "ra-core";

const russianMessages: TranslationMessages = {
  ra: {
    action: {
      add_filter: "Добавить фильтр",
      add: "Добавить",
      back: "Назад",
      bulk_actions: "1 выбран |||| %{smart_count} выбрано |||| %{smart_count} выбрано",
      cancel: "Отмена",
      clear_input_value: "Очистить",
      clear_array_input: "Очистить",
      clone: "Дублировать",
      create_item: "Создать",
      confirm: "Подтвердить",
      create: "Создать",
      delete: "Удалить",
      edit: "Редактировать",
      export: "Экспорт",
      list: "Список",
      refresh: "Обновить",
      remove_filter: "Убрать фильтр",
      remove_all_filters: "Убрать все фильтры",
      remove: "Удалить",
      save: "Сохранить",
      search: "Поиск",
      select_all: "Выбрать все",
      select_row: "Выбрать строку",
      show: "Просмотр",
      sort: "Сортировка",
      undo: "Отменить",
      unselect: "Не выбрано",
      expand: "Раскрыть",
      close: "Закрыть",
      open_menu: "Открыть меню",
      close_menu: "Закрыть меню",
      update: "Обновить",
      move_up: "Вверх",
      move_down: "Вниз",
      open: "Открыть",
      toggle_theme: "Сменить тему",
      select_columns: "Выбрать столбец"
    },
    boolean: {
      true: "Да",
      false: "Нет",
      null: ""
    },
    page: {
      create: "Создать %{name}",
      dashboard: "Главная",
      edit: "%{name} #%{id}",
      error: "Что-то пошло не так",
      list: "%{name}",
      loading: "Загрузка",
      not_found: "Не найдено",
      show: "%{name} #%{id}",
      empty: "Нет %{name}.",
      invite: "Вы хотите добавить еще одну?"
    },
    input: {
      file: {
        upload_several: "Перетащите файлы сюда или нажмите для выбора.",
        upload_single: "Перетащите файл сюда или нажмите для выбора."
      },
      image: {
        upload_several: "Перетащите изображения сюда или нажмите для выбора.",
        upload_single: "Перетащите изображение сюда или нажмите для выбора."
      },
      references: {
        all_missing: "Связанных данных не найдено",
        many_missing:
          "Некоторые из связанных данных не доступны",
        single_missing:
          "Связанный объект не доступен"
      },
      password: {
        toggle_visible: "Скрыть пароль",
        toggle_hidden: "Показать пароль"
      }
    },
    message: {
      about: "Справка",
      are_you_sure: "Вы уверены?",
      auth_error: "Ошибка авторизации",
      bulk_delete_content:
        "Вы уверены, что хотите удалить %{name}? |||| Вы уверены, что хотите удалить объекты, кол-вом %{smart_count} ? |||| Вы уверены, что хотите удалить объекты, кол-вом %{smart_count} ?",
      bulk_update_content:
        "Вы уверены, что хотите обновить %{name}? |||| Вы уверены, что хотите обновить объекты, кол-вом %{smart_count} ? |||| Вы уверены, что хотите обновить объекты, кол-вом %{smart_count} ?",
      bulk_delete_title: "Удалить %{name} |||| Удалить %{smart_count} %{name} |||| Удалить %{smart_count} %{name}",
      bulk_update_title: "Обновить %{name} |||| Обновить %{smart_count} %{name} |||| Обновить %{smart_count} %{name}",
      delete_content: "Вы уверены что хотите удалить этот объект",
      delete_title: "Удалить %{name} #%{id}",
      clear_array_input: "Очистить",
      details: "Описание",
      error: "В процессе запроса возникла ошибка, и он не может быть завершен",
      invalid_form: "Форма заполнена неверно, проверьте, пожалуйста, ошибки",
      loading: "Идет загрузка, пожалуйста, подождите...",
      no: "Нет",
      not_found: "Ошибка URL или вы следуете по неверной ссылке",
      yes: "Да",
      unsaved_changes:
        "Некоторые из ваших изменений не были сохранены. Вы уверены, что хотите их игнорировать?"
    },
    navigation: {
      no_results: "Результатов не найдено",
      no_more_results:
        "Страница %{page} выходит за пределы нумерации, попробуйте предыдущую",
      page_out_of_boundaries: "Страница %{page} вне границ",
      page_out_from_end: "Невозможно переместиться дальше последней страницы",
      page_out_from_begin: "Номер страницы не может быть меньше 1",
      page_range_info: "%{offsetBegin}-%{offsetEnd} из %{total}",
      page_rows_per_page: "Строк на странице:",
      partial_page_range_info: "++",
      next: "Далее",
      previous: "Назад",
      page: "Страница",
      first: "Первая",
      last: "Последняя",
      skip_nav: "Перейти к содержанию",
      current_page: "Текущая страница"
    },
    sort: {
      sort_by: "Сортировать по %{field} %{order}",
      ASC: "возрастанию",
      DESC: "убыванию"
    },
    auth: {
      auth_check_error: "Пожалуйста, авторизуйтесь для продолжения работы",
      user_menu: "Профиль",
      username: "Имя пользователя",
      password: "Пароль",
      sign_in: "Войти",
      sign_in_error: "Ошибка аутентификации, попробуйте снова",
      logout: "Выйти"
    },
    notification: {
      updated: "Элемент обновлен |||| %{smart_count} обновлено |||| %{smart_count} обновлено",
      created: "Элемент создан",
      deleted: "Элемент удален |||| %{smart_count} удалено |||| %{smart_count} удалено",
      bad_item: "Элемент не валиден",
      item_doesnt_exist: "Элемент не существует",
      http_error: "Ошибка сервера",
      data_provider_error: "Ошибка dataProvider, проверьте консоль",
      i18n_error: "Не удалось загрузить перевод для указанного языка",
      canceled: "Операция отменена",
      logged_out: "Ваша сессия завершена, попробуйте переподключиться/войти снова",
      not_authorized: "Не авторизован"
    },
    validation: {
      required: "Обязательно для заполнения",
      minLength: "Минимальное кол-во символов %{min}",
      maxLength: "Максимальное кол-во символов %{max}",
      minValue: "Минимальное значение %{min}",
      maxValue: "Значение может быть %{max} или меньше",
      number: "Должно быть цифрой",
      email: "Некорректный email",
      oneOf: "Должно быть одним из: %{options}",
      regex: "Должно быть в формате (regexp): %{pattern}"
    },
    saved_queries: {
      label: "Этикетка",
      query_name: "Имя запроса",
      new_label: "Новый заголовок",
      new_dialog_title: "Новый заголовок окна",
      remove_label: "Удалить этикетку",
      remove_label_with_name: "Удалить этикетку с именем",
      remove_dialog_title: "Удвлить заголовок окна",
      remove_message: "Удалить сообщение",
      help: "Помощь"
    },
    configurable: {
      customize: "Разное",
      configureMode: "Конфигурация",
      inspector: {
        title: "Заголовок",
        content: "Контекст",
        reset: "Сброс",
        hideAll: "Скрыть все",
        showAll: "Показать все"
      },
      Datagrid: {
        title: "Заголовок",
        unlabeled: "Нет подписи"
      },
      SimpleForm: {
        title: "Заголовок",
        unlabeled: "Нет подписи"
      },
      SimpleList: {
        title: "Заголовок",
        primaryText: "Основной текст",
        secondaryText: "Запасной текст",
        tertiaryText: "Третий текст"
      }
    }
  }
};

export { russianMessages };