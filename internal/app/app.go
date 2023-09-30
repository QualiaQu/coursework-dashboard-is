package app

import (
	"dashboard/internal/transport/rest"
)

func Run() {
	rest.StartServer()
}
