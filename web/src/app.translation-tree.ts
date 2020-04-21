export const TRANSLATION_KEYS = {

  department: {
    single: 'department.single',
    multi: 'department.multi'
  },

  abo: {
    single: 'abo.single',
    multi: 'abo.multi'
  },

  room: {
    single: 'room.single',
    multi: 'room.multi'
  },

  error: {
    failed_to_fetch: 'error.failed_to_fetch'
  },

  dialog: {
    qr_code: {
      close: 'dialog.qr_code.close'
    },
    simple_confirm: {
      default: {
        confirm: 'dialog.simple_confirm.default.confirm',
        chancel: 'dialog.simple_confirm.default.chancel'
      },
      delete_department: {
        title: 'dialog.simple_confirm.delete_department.title',
        text: 'dialog.simple_confirm.delete_department.text'
      },
      reset_edit_data: {
        title: 'dialog.simple_confirm.reset_edit_data.title',
        text: 'dialog.simple_confirm.reset_edit_data.text'
      },
      delete_room: {
        title: 'dialog.simple_confirm.delete_room.title',
        text: 'dialog.simple_confirm.delete_room.text'
      },
      delete_abo: {
        title: 'dialog.simple_confirm.delete_abo.title',
        text: 'dialog.simple_confirm.delete_abo.text'
      }
    },
  },
  snackbar: {
    unauthorized: 'snackbar.unauthorized.message',
    edit: {
      department: {
        success: 'snackbar.edit.department.success',
        failed: 'snackbar.edit.department.failed'
      },
      room: {
        success: 'snackbar.edit.room.success',
        failed: 'snackbar.edit.room.failed'
      },
      abo: {
        success: 'snackbar.edit.abo.success',
        failed: 'snackbar.edit.abo.failed'
      }
    },
    create: {
      department: {
        success: 'snackbar.create.department.success',
        failed: 'snackbar.create.department.failed'
      },
      room: {
        success: 'snackbar.create.room.success',
        failed: 'snackbar.create.room.failed'
      },
      abo: {
        success: 'snackbar.create.abo.success',
        failed: 'snackbar.create.abo.failed'
      },
      reservation: {
        success: 'snackbar.create.reservation.success',
        failed: 'snackbar.create.reservation.failed'
      }
    },
    delete: {
      department: {
        success: 'snackbar.delete.department.success',
        failed: 'snackbar.delete.department.failed'
      },
      room: {
        success: 'snackbar.delete.room.success',
        failed: 'snackbar.delete.room.failed'
      },
      abo: {
        success: 'snackbar.delete.abo.success',
        failed: 'snackbar.delete.abo.failed'
      }
    }
  },
  nav: {
    group: {
      general: 'nav.groups.general',
      administration: 'nav.groups.administration',
      user: 'nav.groups.user'
    },
    link: {
      rooms: 'nav.links.rooms',
      departments: 'nav.links.departments',
      roles: 'nav.links.roles',
      abos: 'nav.links.abos',
      logout: 'nav.links.logout',
      login: 'nav.links.login',
      help: 'nav.links.help',
      settings: 'nav.links.settings',
      my_abos: 'nav.links.my_abos',
      my_reservations: 'nav.links.my_reservations'
    }
  },
  page: {
    main: {
      title: 'page.main.title'
    },
    department: {
      list: {
        title: 'page.department.list.title'
      },
      create: {
        title: 'page.department.create.title'
      },
      edit: {
        title: 'page.department.edit.title'
      },
      detail: {
        title: 'page.department.detail.title',
        labels: {
          description: 'page.department.detail.labels.description',
          no_description: 'page.department.detail.labels.no_description',
          rooms: 'page.department.detail.labels.rooms',
          no_room: 'page.department.detail.labels.no_room',
        }
      }
    },
    room: {
      list: {
        title: 'page.room.list.title'
      },
      create: {
        title: 'page.room.create.title'
      },
      edit: {
        title: 'page.room.edit.title'
      },
      detail: {
        title: 'page.room.detail.title',
        labels: {
          room: 'page.room.detail.labels.room',
          description: 'page.room.detail.labels.description',
          no_description: 'page.room.detail.labels.no_description',
        }
      }
    },
    abo: {
      list: {
        titles: {
          all: 'page.abo.list.titles.all',
          user: 'page.abo.list.titles.user',
          owner: 'page.abo.list.titles.owner'
        }
      },
      create: {
        title: 'page.abo.create.title'
      },
      edit: {
        title: 'page.abo.edit.title'
      },
      detail: {
        title: 'page.abo.detail.title',
        labels: {
          minutes: 'page.abo.detail.labels.minutes',
          weekly: 'page.abo.detail.labels.weekly',
          renew: 'page.abo.detail.labels.renew',
          period: 'page.abo.detail.labels.period',
          room: 'page.abo.detail.labels.room',
          rooms: 'page.abo.detail.labels.rooms',
          contingent: 'page.abo.detail.labels.contingent',
          details: 'page.abo.detail.labels.details',
          description: 'page.abo.detail.labels.description',
          no_description: 'page.abo.detail.labels.no_description'
        },
        formats: {
          period_date: 'component.abo_preview_card.formats.period_date'
        }
      }
    },
    reservation: {
      list: {
        titles: {
          all: 'page.reservation.list.titles.all',
          user: 'page.reservation.list.titles.user',
          owner: 'page.reservation.list.titles.owner'
        }
      },
      create: {
        title: 'page.reservation.create.title'
      },
      // edit: {
      //   title: 'page.abo.edit.title'
      // },
      // detail: {
      //   title: 'page.abo.detail.title',
      //   labels: {
      //     minutes: 'page.abo.detail.labels.minutes',
      //     weekly: 'page.abo.detail.labels.weekly',
      //     renew: 'page.abo.detail.labels.renew',
      //     period: 'page.abo.detail.labels.period',
      //     room: 'page.abo.detail.labels.room',
      //     rooms: 'page.abo.detail.labels.rooms',
      //     contingent: 'page.abo.detail.labels.contingent',
      //     details: 'page.abo.detail.labels.details',
      //     description: 'page.abo.detail.labels.description',
      //     no_description: 'page.abo.detail.labels.no_description'
      //   },
      //   formats: {
      //     period_date: 'component.abo_preview_card.formats.period_date'
      //   }
      // }
    },
    user: {
      abo: {
        list: {
          title: 'page.user.abo.list.title'
        },
      }
    },
  },
  toolbar: {
    search: 'toolbar.search'
  },
  component: {
    room_detail_card: {
      labels: {
        room: 'component.room_detail_card.labels.room'
      }
    },
    abo_preview_card: {
      labels: {
        minutes: 'component.abo_preview_card.labels.minutes',
        period: 'component.abo_preview_card.labels.period',
        room: 'component.abo_preview_card.labels.room',
        rooms: 'component.abo_preview_card.labels.rooms',
      },
      formats: {
        period_date: 'component.abo_preview_card.formats.period_date'
      }
    },
    department_form: {
      name: {
        label: 'component.department_form.name.label',
        errors: {
          required: 'component.department_form.name.errors.required'
        }
      },
      description: {
        label: 'component.department_form.description.label'
      }
    },
    room_form: {
      name: {
        label: 'component.room_form.name.label',
        errors: {
          required: 'component.room_form.name.errors.required'
        }
      },
      department: {
        label: 'component.room_form.department.label',
        errors: {
          required: 'component.room_form.department.errors.required'
        }
      },
      number: {
        label: 'component.room_form.number.label',
        errors: {
          required: 'component.room_form.number.errors.required'
        }
      },
      description: {
        label: 'component.room_form.description.label'
      }
    },
    abo_form: {
      steps: {
        details: 'component.abo_form.steps.details',
        rooms: 'component.abo_form.steps.rooms'
      },
      user: {
        label: 'component.abo_form.user.label',
        errors: {
          required: 'component.abo_form.user.errors.required'
        }
      },
      description: {
        label: 'component.abo_form.description.label'
      },
      title: {
        label: 'component.abo_form.title.label',
        errors: {
          required: 'component.abo_form.title.errors.required'
        }
      },
      rooms: {
        label: 'component.abo_form.rooms.label',
        query: 'component.abo_form.rooms.query',
        select_all: 'component.abo_form.rooms.select_all',
        errors: {
          required: 'component.abo_form.rooms.errors.required'
        }
      },
      start: {
        label: 'component.abo_form.start.label',
        errors: {
          required: 'component.abo_form.start.errors.required'
        }
      },
      end: {
        label: 'component.abo_form.end.label',
        errors: {
          required: 'component.abo_form.end.errors.required'
        }
      },
      unlimited_end: {
        label: 'component.abo_form.unlimited_end.label'
      },
      unlimited_contingent: {
        label: 'component.abo_form.unlimited_contingent.label'
      },
      contingent: {
        label: 'component.abo_form.contingent.label',
        suffix: 'component.abo_form.contingent.suffix',
        errors: {
          required: 'component.abo_form.contingent.errors.required'
        }
      }
    },
    reservation_form: {
      user: {
        label: 'component.reservation_form.user.label',
        errors: {
          required: 'component.reservation_form.user.errors.required'
        }
      },
      abo: {
        label: 'component.reservation_form.abo.label',
        errors: {
          required: 'component.reservation_form.abo.errors.required'
        }
      },
      title: {
        label: 'component.reservation_form.title.label',
        errors: {
          required: 'component.reservation_form.title.errors.required'
        }
      },
      description: {
        label: 'component.reservation_form.description.label'
      },
      room: {
        label: 'component.reservation_form.room.label',
        min: 'component.reservation_form.room.min',
        errors: {
          required: 'component.reservation_form.room.errors.required'
        }
      },
      date: {
        label: 'component.reservation_form.date.label',
        errors: {
          required: 'component.reservation_form.date.errors.required'
        }
      },
      start: {
        label: 'component.reservation_form.start.label',
        errors: {
          required: 'component.reservation_form.start.errors.required'
        }
      },
      end: {
        label: 'component.reservation_form.end.label',
        errors: {
          required: 'component.reservation_form.end.errors.required'
        }
      },
      contingent: {
        error: 'component.reservation_form.contingent.error'
      },
      slots: {
        label: 'component.reservation_form.slots.label'
      },
      overall: {
        clock: 'component.reservation_form.overall.clock',
        contingent_before: 'component.reservation_form.overall.contingent_before',
        contingent_consumed: 'component.reservation_form.overall.contingent_consumed',
        contingent_after: 'component.reservation_form.overall.contingent_after',
      }
    }
  }
};
