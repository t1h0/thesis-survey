<?php
session_start();
include("task1/".$_SESSION["articles"][$_POST["index"]][0].".php");